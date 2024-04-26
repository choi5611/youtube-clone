export interface InitialState {
  // 초기상태 정의
  videos: HomePageVideos[]; // 홈페이지에 표시되는 비디오 목록
  currentPlaying: CurrentPlaying | null; // 현재 재생중인 비디오
  searchTerm: string; // 내가 입력한 검색어를 나타냄
  searchResults: []; // 검색결과로 나타낼 비디오 목록 현재는 빈 배열
  nextPageToken: string | null; // 다음페이지 요청 시 사용되는 토큰 문자열 또는 null
  recommendedVideos: RecommendedVideos[]; // 추천영상 비디오 목록
}

export interface HomePageVideos {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoLink: string;
  videoThumbnail: string;
  videoDuration: string;
  videoViews: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
  };
}
export interface CurrentPlaying {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoViews: string;
  videoLikes: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
    subscribers: string;
  };
}
export interface RecommendedVideos {
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  videoDuration: string;
  videoViews: string;
  videoAge: string;
  channelInfo: {
    id: string;
    name: string;
  };
}

export interface Item {
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    publishedAt: Date;
    channelTitle: string;
    channelId: string;
  };
  contentDetails: { upload: { videoId: string } };
}
