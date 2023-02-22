export const getHPList = (rawCurrent: number, max: number): boolean[] => {
  const current = Math.min(Math.max(rawCurrent, 0), max);
  const result: boolean[] = [];

  [...Array(current)].forEach(() => {
    result.push(true);
  });
  [...Array(max - current)].forEach(() => {
    result.push(false);
  });

  return result;
};
