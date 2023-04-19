export const getJellyLevelAndExp = (
  jellyLevelInfoList: {
    nextLevelSog: number;
    level: number;
  }[],
  exp: number
) => {
  let currentLevelIndex = 0;
  let currentExp = exp;

  for (let i = 0; i < jellyLevelInfoList.length; i++) {
    const maxExp: number =
      jellyLevelInfoList[currentLevelIndex + 1]?.nextLevelSog ?? Infinity;

    if (currentExp >= maxExp) {
      currentExp -= maxExp;
      currentLevelIndex++;
      continue;
    }
  }

  return {
    level: jellyLevelInfoList[currentLevelIndex].level,
    exp: currentExp,
  };
};
