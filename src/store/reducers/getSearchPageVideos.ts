import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../Types";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/searchPageVideos",
  async (isNext: boolean, { getState }) => {
    // createAsyncThunk 함수를 사용하여 비동기 액션 생성자 함수를 정의합니다.
    // SearchPage의 영상 목록을 가져오는 작업
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    // redux 상태에서 이전 상태를 가져옵니다. 여기서는 현재Redux상태에서
    // nextPageTokenFromState, videos, searchTerm를 가져옵니다.

    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    // Axios를 사용하여 YouTube의 검색 API를 호출합니다.
    // 이때 검색어(q), API 키(key), 파트(part), 비디오 유형(type)을 쿼리 문자열로 전달합니다.
    // isNext가 true이면 이전 페이지의 토큰을 사용하여 다음 페이지의 비디오를 가져옵니다.

    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
  // 가져온 데이터를 파싱하여 홈페이지 비디오와 합친 후에 결과를 반환합니다.
  // 이렇게 함으로써 현재 Redux 상태에 있는 비디오 목록과 새로 가져온 비디오 목록을 합치고
  // 다음 페이지 토큰을 반환합니다.
);
