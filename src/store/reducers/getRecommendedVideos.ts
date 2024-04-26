import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { RecommendedVideos } from "../../Types";
import { parseRecommendedData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtubeApp/getRecommendedVideos",
  async (videoId: string, { getState }) => {
    // createAsyncThunk 함수를 사용하여 비동기 액션 생성자 함수를 정의합니다.
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState() as RootState;
    // getState 함수를 사용하여 Redux 상태에서 현재 상태를 가져옵니다.
    // 현재 재생 중인 영상의 채널ID를 가져옵니다.
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );
    // Axios를 사용하여 YouTube의 활동(activities) API를 호출합니다.
    //여기서는 해당 채널의 활동 중에서 비디오 타입인 활동을 가져오고, 해당 비디오의 관련 데이터를 가져옵니다.
    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    );

    return { parsedData };
    // 가져온 데이터를 파싱하여 추천 비디오 목록을 반환합니다.
    // 추천 비디오 목록을 Redux 상태에 업데이트할 수 있습니다.
  }
);
