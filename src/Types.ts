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
  videoId: string; //영상의 고유 ID
  videoTitle: string; //영상의 제목
  videoDescription: string; //영상의 설명
  videoLink: string; // 영상의 링크
  videoThumbnail: string; //영상의 썸네일
  videoDuration: string; //영상의 재생 시간
  videoViews: string; // 영상의 조회수
  videoAge: string; // 업로드 된 시간
  channelInfo: {
    //비디오를 업로드한 채널의 관한 정보
    id: string; //채널의 ID
    image: string; //채널의 이미지
    name: string; //채널의 이름
  };
}
export interface CurrentPlaying {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoViews: string;
  videoLikes: string; //영상의 추천 수
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
    subscribers: string; //영상의 구독자
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
    thumbnails: { medium: { url: string } }; //썸네일 이미지 정보 미디움 크기의 썸네일 URL
    publishedAt: Date; //영상 업로드된 시간
    channelTitle: string; //채널 제목
    channelId: string;
  };
  contentDetails: { upload: { videoId: string } }; //비디오 내용의 대한 정보
  // 비디오 업로드와 관련된 정보를 포함하는 객체입니다. 여기에는 videoId라는 필드가 있으며
  // 비디오의 고유 ID를 나타냅니다. 이 ID는 다른 API 요청에서 비디오를 식별하는 데 사용됩니다.
}
