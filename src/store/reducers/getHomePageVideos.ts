import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../Types";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVideos",
  async (isNext: boolean, { getState }) => {
    //createAsyncThunk 함수를 사용하여 비동기 액션 생성자 함수를 정의합니다.
    // 이 함수는 홈페이지 영상을 가져오는 작업을 수행합니다.
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    // getState 함수를 사용하여 Redux 상태에서 현재 상태를 가져옵니다.
    // 다음 페이지 토큰과 현재 홈페이지 영상 목록을 가져옵니다.

    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    // Axios를 사용하여 YouTube의 검색(search) API를 호출합니다.
    // 여기서는 "reactjs projects"라는 검색어로 비디오를 검색하고, 해당 검색 결과를 가져옵니다.

    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
    // 가져온 데이터를 파싱하여 홈페이지 비디오 목록을 반환합니다.
    // 홈페이지 비디오 목록을 Redux 상태에 업데이트할 수 있습니다.
  }
);
