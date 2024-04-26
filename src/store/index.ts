import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../Types";
import { getHomePageVideos } from "./reducers/getHomePageVideos";
import { getRecommendedVideos } from "./reducers/getRecommendedVideos";
import { getSearchPageVideos } from "./reducers/getSearchPageVideos";
import { getVideoDetails } from "./reducers/getVideoDetails";

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const YoutubeSlice = createSlice({
  //Redux 슬라이스 생성
  name: "youtubeApp", //슬라이스의 이름
  initialState, //초기상태
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  }, // 리듀서 함수를 정의, 현 상태는 빈 객체
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.parsedData;
    });
  }, //비동기 작업에대한 추가 리듀서 함수를 정의함
});

export const store = configureStore({
  //Redux 스토어 생성
  reducer: {
    //Redux 스토어에 등록할 리듀서를 정의, 생성한 슬라이스의 리듀서 등록
    youtubeApp: YoutubeSlice.reducer,
  },
});
export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  YoutubeSlice.actions;

export type RootState = ReturnType<typeof store.getState>; //스토어 전체 상태 타입 정의
export type AppDispatch = typeof store.dispatch; // 스토어의 디스패치 함수 타입 정의
