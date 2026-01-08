export const formatWithSpace = (num: number): string => {
  if (num == null || isNaN(num)) return "-";
  const fixed = Number(num.toFixed(2));
  return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
export const formatWithSpaceFixedZero = (num: number): string => {
  if (num == null || isNaN(num)) return "-";
  const fixed = Number(num.toFixed(0));
  return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
