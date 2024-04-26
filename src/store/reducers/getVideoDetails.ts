import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViewstoString, timeSince } from "../../utils";

import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

// createAsyncThunk 함수를 사용하여 비동기 액션 생성자 함수를 정의합니다.
// 비동기 작업을 수행하고, 액션을 디스패치하는 역할을 합니다.
export const getVideoDetails = createAsyncThunk(
  "youtubeApp/videoDetails",
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );
    return parseData(items[0]);
  }
);
// parseData 함수는 비동기적으로 영상의 세부 정보를 파싱하는 역할
// 영상의 제목,설명,조회수,추천,채널 정보 등등
const parseData = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: Date;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );
  // 해당 영상의 채널 정보를 가져옵니다. 채널의 썸네일 이미지와 URL,구독자 수가 포함

  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
    videoLikes: convertRawViewstoString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewstoString(subscriberCount, true),
    },
  };
  // 파싱한 비디오의 세부 정보를 객체로 반환합니다.
  // 여기에는 비디오 ID, 제목, 설명, 조회수, 좋아요 수, 영상 나이, 채널 정보 등이 포함됩니다.
  // 반환된 정보는 getVideoDetails 액션의 페이로드로 사용됩니다.
};
