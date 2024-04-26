import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { HomePageVideos } from "../Types";
import { clearVideos } from "../store";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import SearchCard from "../components/SearchCard";
export default function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);
  //컴포넌트가 렌더링될 때 마다 실행됩니다.
  //Redux의 clearVideos 액션을 디스패치하여 이전에 검색된 영상을 초기화
  //검색어가 없는 경우 홈페이지로 리다이렉트
  //검색어가 있는 경우 Redux의 getSearchPagevideos 액션을 디스패하지하 검색된 영상을 가져옵니다.

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex " style={{ height: "93vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              // 액션을 디스패치하여 다음 페이지의 비디오를 가져옵니다.
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={900}
            >
              {videos.map((item: HomePageVideos) => {
                return (
                  <div className="my-5">
                    <SearchCard data={item} key={item.videoId} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
