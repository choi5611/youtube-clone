import React from "react";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { GiFilmStrip } from "react-icons/gi";
const Sidebar = () => {
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: "홈",
    },
    {
      icon: <FaRegCompass className="text-xl" />,
      name: "Explore",
    },
    {
      icon: <MdOutlineSlowMotionVideo className="text-xl" />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: "구독",
    },
  ];

  const secondaryLinks = [
    {
      icon: <MdOutlineVideoLibrary className="text-xl" />,
      name: "보관함",
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: "시청 기록",
    },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: "내 동영상",
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: "나중에 볼 동영상",
    },
    {
      icon: <MdThumbUpOffAlt className="text-xl" />,
      name: "좋아요 표시한 동영상",
    },
  ];

  const subscriptionLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: "음악",
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "운동",
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "게임",
    },
    {
      icon: <GiFilmStrip className="text-xl" />,
      name: "영화",
    },
  ];

  const helpLinks = [
    {
      icon: <MdSettings className="text-xl" />,
      name: "설정",
    },
    {
      icon: <MdOutlinedFlag className="text-xl" />,
      name: "신고 기록",
    },
    {
      icon: <MdOutlineHelpOutline className="text-xl" />,
      name: "도움",
    },
    {
      icon: <MdOutlineFeedback className="text-xl" />,
      name: "의견 보내기",
    },
  ];

  const textLinks = [
    ["정보", "보도자료", "저작권", "문의하기", "크리에이터", "광고", "개발자"],
    [
      "약관",
      "개인정보처리방침",
      "정책 및 안전",
      "유튜브 작동의 원리",
      "새로운 기능 테스트 하기",
    ],
  ];
  return (
    <div className="w-2/12 bg-[#212121]  overflow-auto pb-8 sidebar">
      <ul className="flex flex-col border-b-2 border-gray-700 cursor:pointer">
        {mainLinks.map(({ icon, name }) => {
          return (
            <li
              key={name}
              className={`pl-6 py-3 hover:bg-zinc-600 ${
                name === "Home" ? "bg-slate-600" : ""
              }`}
            >
              <a href="#" className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-2 border-gray-700 cursor:pointer">
        {secondaryLinks.map(({ icon, name }) => {
          return (
            <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
              <a href="#" className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-2 border-gray-700 cursor:pointer">
        {subscriptionLinks.map(({ icon, name }) => {
          return (
            <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
              <a href="#" className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-2 border-gray-700 cursor:pointer">
        {helpLinks.map(({ icon, name }) => {
          return (
            <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
              <a href="#" className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
        {textLinks[0].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
        {textLinks[1].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <span className="px-4 text-sm text-zinc-400">&copy; 2024 Google</span>
      <br />
      <p className="px-4 px-3 text-sm text-zinc-400">YouTube 클론 사이트</p>
    </div>
  );
};

export default Sidebar;
