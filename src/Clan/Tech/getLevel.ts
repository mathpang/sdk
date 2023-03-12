import { TechID } from "./TechID";

export function getLevel({
  techId,
  totalPoint,
}: {
  techId: TechID;
  totalPoint: number;
}): number {
  function getLevelByPointList(pointList: number[]) {
    return Math.max(0, pointList.findIndex((point) => totalPoint < point) - 1);
  }

  switch (techId) {
    case "EXTENDS_LAB":
    case "EXTENDS_FACTORY":
    case "EXTENDS_ROAD":
      return getLevelByPointList([0, 5000, 10000, 15000, 20000, 25000]);

    case "FASHIONISTA":
      return getLevelByPointList([0, 15000, 20000, 25000, 30000, 40000]);

    case "RESEARCH_LAB":
    case "RESEARCH_FACTORY":
    case "RESEARCH_ROAD":
      return getLevelByPointList([0, 10000, 15000, 20000, 25000, 35000]);

    case "PET_LOVER":
      return getLevelByPointList([0, 15000, 20000, 25000, 30000, 35000]);

    default:
      return 0;
  }
}
