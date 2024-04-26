export const parseVideoDuration = (duration: string): string => {
  //duration 문자열을 인자로 받아옴
  const durationParts: string[] = duration
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");
  // duration 문자열에서 "PT는 제거하고" H는 :로 , M은 :로 , S는 제거
  // . 를 기준으로 문자열을 나눠서 배열에 저장
  if (durationParts.length === 3) {
    return `${durationParts[0]}:${
      parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
    }:${
      parseInt(durationParts[2]) < 9 ? `0${durationParts[2]}` : durationParts[2]
    }`;
  }
  // durationParts의 길이가 3인경우 시,분,초를 나타내는 부분을 가져와서 시간 형식으로 반환
  // 만약 분이나 초가 9 미만의 숫자인 경우에는 앞에 0을 붙힘
  if (durationParts.length === 2) {
    return `${durationParts[0]}:${
      parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
    }`;
  }
  // durationParts의 길이가 2인경우 시,분,초를 나타내는 부분을 가져와서 시간 형식으로 반환
  // 만약 분이나 초가 9 미만의 숫자인 경우에는 앞에 0을 붙힘
  if (durationParts.length === 1) {
    return `0:${
      parseInt(durationParts[0]) < 9 ? `0${durationParts[0]}` : durationParts[0]
    }`;
  }
  // durationParts의 길이가 1인경우 시,분,초를 나타내는 부분을 가져와서 시간 형식으로 반환
  // 만약 분이나 초가 9 미만의 숫자인 경우에는 앞에 0을 붙힘
  return "";
  // 만약 duration 문자열이 비어있는 경우에는 빈 문자열을 return
};
