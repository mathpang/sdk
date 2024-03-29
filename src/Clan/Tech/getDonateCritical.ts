import { MathUtil } from "../../Util/Math";

// https://www.notion.so/mathpang/1b91c638fe47402b906653fb6e160da4
export function getDonateCritical(
  userId: number,
  totalDonateAmount: number,
  criticalUpgradeStep = 0
) {
  const seed = MathUtil.sliceUnderPoint(
    Math.sqrt(userId * totalDonateAmount + totalDonateAmount ** 2 + 1 / 7),
    9,
    10
  );

  // seed 는 0 ~ 99 의 불규칙한 값
  if (seed < 7 + criticalUpgradeStep * 0.4) return "CRITICAL_10";
  if (seed < 20 + criticalUpgradeStep * 0.8) return "CRITICAL_5";
  if (seed < 50 + criticalUpgradeStep * 1.2) return "CRITICAL_2";
  return null;
}
