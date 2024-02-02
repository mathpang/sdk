import { TechID } from "./TechID";

type MaxPointMap = {
  [key in TechID]: number[];
};

const maxPointMap: MaxPointMap = {
  EXTENDS_LAB: [0, 5000, 10000, 15000, 20000, 25000],
  EXTENDS_FACTORY: [0, 5000, 10000, 15000, 20000, 25000],
  EXTENDS_ROAD: [0, 5000, 10000, 15000, 20000, 25000],
  FASHIONISTA: [0, 15000, 20000, 25000, 30000, 40000],
  RESEARCH_LAB: [0, 10000, 15000, 20000, 25000, 35000],
  RESEARCH_FACTORY: [0, 10000, 15000, 20000, 25000, 35000],
  RESEARCH_ROAD: [0, 10000, 15000, 20000, 25000, 35000],
  PET_LOVER: [0, 15000, 20000, 25000, 30000, 35000],
  LUCKY_COIN: [0, 10000, 15000, 25000, 30000, 40000],
  BROKEN_CLOCK: [0, 10000, 15000, 25000, 30000, 40000],
  ADVANCED_BOARD: [0, 10000, 20000, 30000, 40000, 50000],
  FOUR_LEAF_CLOVER: [0, 10000, 20000, 30000, 40000, 50000],
  GRATE_CLAN: [0, 30000, 60000, 120000],

  FACTORY_3: [0, 30000, 60000, 90000, 120000, 200000],
  LAB_3: [0, 30000, 60000, 90000, 120000, 200000],
  ROAD_3: [0, 30000, 60000, 90000, 120000, 200000],

  FACTORY_4: [0, 60000, 90000, 120000, 180000, 300000],
  LAB_4: [0, 60000, 90000, 120000, 180000, 300000],
  ROAD_4: [0, 60000, 90000, 120000, 180000, 300000],

  GOLD_TICKET_1: [0, 50000, 75000, 100000, 150000, 250000],
  GOLD_TICKET_2: [0, 80000, 120000, 160000, 240000, 400000],
};

export function getLevelAndRestTechPoint({
  techId,
  totalPoint,
}: {
  techId: TechID;
  totalPoint: number;
}): {
  level: number;
  restTechPoint: number;
} {
  const maxPoints = maxPointMap[techId];
  let level = 0;
  let restTechPoint = totalPoint;

  for (const maxPoint of maxPoints) {
    // maxPoint가 0일때는 무시
    if (maxPoint === 0) {
      continue;
    }

    // restTechPoint가 maxPoint보다 작으면 더이상 레벨이 올라가지 않기 때문에 break
    if (maxPoint > restTechPoint) {
      break;
    }

    // restTechPoint >= maxPoint이기 때문에 level을 1 올리고 restTechPoint를 현재 maxPoint만큼 줄인다
    level += 1;
    restTechPoint -= maxPoint;
  }

  return {
    level,
    restTechPoint,
  };
}
