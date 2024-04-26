export const convertRawViewstoString = (
  labelValue: String,
  isSub = false
): string => {
  const numericValue = Math.abs(Number(labelValue));

  if (numericValue >= 100000000) {
    return (numericValue / 100000000).toFixed(isSub ? 2 : 1) + "억";
  } else if (numericValue >= 10000000) {
    return (numericValue / 10000000).toFixed(isSub ? 2 : 1) + "천만";
  } else if (numericValue >= 10000) {
    return (numericValue / 10000).toFixed(isSub ? 2 : 1) + "만회";
  } else if (numericValue >= 1000) {
    return (numericValue / 1000).toFixed(isSub ? 2 : 1) + "천회";
  } else {
    return numericValue.toString();
  }
};
