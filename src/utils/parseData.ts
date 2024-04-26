import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { YOUTUBE_API_URL } from "./constants";
import { HomePageVideos } from "../Types";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseData = async (items: any[]) => {
  // 이 함수는 아이템 배열을 인자로 받습니다.
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    items.forEach(
      (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
        channelIds.push(item.snippet.channelId);
        videoIds.push(item.id.videoId);
      }
    );
    // items 배열에서 각 아이템의 채널 ID와 비디오 ID를 추출하여 각각의 배열에 저장합니다.

    const {
      data: { items: channelsData },
    } = await axios.get(
      `${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );
    // axios를 사용하여 YouTube API를 호출하고, channelIds 배열에 있는 채널 ID들을
    // 쿼리 문자열로 만들어서 API에 전달합니다. 그 결과로 받아온 채널 데이터는 channelsData에 저장합니다.
    const parsedChannelsData: { id: string; image: string }[] = [];
    channelsData.forEach(
      (channel: {
        id: string;
        snippet: { thumbnails: { default: { url: string } } };
      }) =>
        parsedChannelsData.push({
          id: channel.id,
          image: channel.snippet.thumbnails.default.url,
        })
    );
    // channelsData 배열을 순회하면서 각 채널의 ID와 이미지 URL을 추출하여 새로운 형식의 객체로 변환하고,
    // parsedChannelsData 배열에 추가합니다.
    const {
      data: { items: videosData },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    // axios를 사용하여 YouTube API를 호출하고, videoIds 배열에 있는 비디오 ID들을
    // 쿼리 문자열로 만들어서 API에 전달합니다. 그 결과로 받아온 비디오 데이터는 videosData에 저장합니다.
    const parsedData: HomePageVideos[] = [];
    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number
      ) => {
        const { image: channelImage } = parsedChannelsData.find(
          (data) => data.id === item.snippet.channelId
        )!;
        if (channelImage)
          parsedData.push({
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail: item.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoDuration: parseVideoDuration(
              videosData[index].contentDetails.duration
            ),
            videoViews: convertRawViewstoString(
              videosData[index].statistics.viewCount
            ),
            videoAge: timeSince(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: item.snippet.channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
      }
    );
    // items 배열을 순회하면서 각 아이템의 정보를 추출하고, 이를 새로운 형식의 홈페이지 비디오 데이터로 변환하여
    // parsedData 배열에 추가합니다. 이때, 각 비디오의 채널 이미지는 이전에 추출한 parsedChannelsData 배열에서 찾아서 사용합니다.
    return parsedData;
    //정상적으로 처리되면 변환된 데이터를 반환하고, 에러가 발생한 경우에는 콘솔에 에러를 출력합니다.
  } catch (err) {
    console.log(err);
  }
};
