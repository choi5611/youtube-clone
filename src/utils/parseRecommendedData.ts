import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { YOUTUBE_API_URL } from "./constants";
import { Item, RecommendedVideos } from "../Types";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseRecommendedData = async (items: Item[], videoId: string) => {
  // 이 함수는 아이템 배열과 비디오 ID를 인자로 받습니다.
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    const newItems: Item[] = [];
    items.forEach((item: Item) => {
      channelIds.push(item.snippet.channelId);
      if (item.contentDetails?.upload?.videoId) {
        videoIds.push(item.contentDetails.upload.videoId);
        newItems.push(item);
      }
    });
    // 받아온 아이템 배열에서 채널 ID와 비디오 ID를 추출하여 각각의 배열에 저장합니다.
    // 이때, videoIds 배열에는 동영상 ID만 저장하고, newItems 배열에는 videoIds와 매칭되는
    // 새로운 아이템만 저장합니다.
    const {
      data: { items: videosData },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    // axios를 사용하여 YouTube API를 호출하고,
    // videoIds 배열에 있는 동영상 ID들을 쿼리 문자열로 만들어서 API에 전달합니다.
    // 그 결과로 받아온 동영상 데이터는 videosData에 저장합니다.

    const parsedData: RecommendedVideos[] = [];
    newItems.forEach((item, index) => {
      if (index >= videosData.length) return;
      if (videoId === item?.contentDetails?.upload?.videoId) return;
      parsedData.push({
        videoId: item.contentDetails.upload.videoId,
        videoTitle: item.snippet.title,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        videoDuration: parseVideoDuration(
          videosData[index].contentDetails.duration
        ),
        videoViews: convertRawViewstoString(
          videosData[index].statistics.viewCount
        ),
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: {
          id: item.snippet.channelId,
          name: item.snippet.channelTitle,
        },
      });
    });
    // newItems 배열을 순회하면서 각 아이템의 정보를 추출하고, 이를 새로운 형식의 객체로 변환하여
    // parsedData 배열에 추가합니다. 이때, videoId가 주어진 videoId와 동일한 경우에는 해당 아이템을 제외하고 저장합니다.
    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
