/** 초당 클릭 횟수 */
const CLICK_PER_SECOND = 6;

/**
 * @description 젤리 파워 계산하는 함수
 * @see https://www.notion.so/mathpang/ac430f37beb949a7bf0a5e492207c84f?pvs=4#78385c7ae89046faa92a6ce2bc49d7ec
 */
export const getJellyPower = ({
  defaultAttackStat,
  defaultCriticalChance,
  defaultCriticalDamage,
  defaultHpStat,
  defaultRecoveryStat,
  attackPercentage,
  hpPercentage,
  recoveryPercentage,
}: {
  /** 젤리 기본 공격력 */
  defaultAttackStat: number;

  /** 젤리 기본 회복속도 */
  defaultRecoveryStat: number;

  /** 젤리 기본 체력 */
  defaultHpStat: number;

  /** 젤리 기본 크리티컬 확률 */
  defaultCriticalChance: number;

  /** 젤리 기본 크리티컬 공격력 */
  defaultCriticalDamage: number;

  /** 레벨 당 공격 배수 */
  attackPercentage: number;

  /** 레벨 당 체력 배수 */
  hpPercentage: number;

  /** 레벨 당 회복 배수 */
  recoveryPercentage: number;
}) => {
  /** 공격력 */
  const attackPower = defaultAttackStat * (attackPercentage / 100);

  /** 회복속도 */
  const recoveryPower = defaultRecoveryStat * (recoveryPercentage / 100);

  /** 체력 */
  const hpPower = defaultHpStat * (hpPercentage / 100);

  /** 크리티컬 확률 */
  const criticalChance = defaultCriticalChance / 100;

  /** 크리티컬 공격력 */
  const criticalDamage = defaultCriticalDamage;

  /** 기본 공격 DPS */
  const commonAttackDPS =
    (attackPower * (1 - criticalChance) +
      attackPower * criticalDamage * criticalChance) *
    CLICK_PER_SECOND;

  /** DPS */
  const dps = commonAttackDPS;

  /** 스킬 결합 체력 */
  const skillCombinedHealth = hpPower;

  /** 젤리 파워 */
  const jellyPower = Math.floor(
    Math.sqrt(dps * (skillCombinedHealth + 5 * recoveryPower))
  );

  return jellyPower;
};
