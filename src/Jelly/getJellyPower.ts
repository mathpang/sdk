/** 초당 클릭 횟수 */
const CLICK_PER_SECOND = 6;

export interface CharacterJellyStat {
  /** 젤리파워 */
  combatPoint: number;

  /** 공격력 */
  attackPoint: number;

  /** 분당 체력 회복속도 */
  staminaPoint: number;

  /** 체력 */
  healthPoint: number;

  /** 크리티컬 확률 (%) */
  criticalChance: number;

  /** 크리티컬 데미지 (배) */
  criticalDamage: number;
}

/** 배수 효과 객체 */
export type StatMultiplier = Partial<
  Pick<
    CharacterJellyStat,
    "attackPoint" | "healthPoint" | "criticalChance" | "staminaPoint"
  >
>;

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
  levelMultiplier,
  classEffectMultiplier = {},
  skillMultiplier = {},
  skillDpsMultiplier = 1,
  healDpsMultiplier = 1,
  shieldSkillMultiplier = 0,
  additionalAttackByType = 0,
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

  /** 젤리 레벨별 배수 */
  levelMultiplier: StatMultiplier;

  /** 젤리 직업 효과 배수 */
  classEffectMultiplier?: StatMultiplier;

  /** 젤리 스킬 효과 배수 */
  skillMultiplier?: StatMultiplier;

  /**
   * 스킬 공격력 배수
   * = (1스킬 공격 스킬계수) * (닌자 젤리 효과) / (1스킬 쿨타임)
   */
  skillDpsMultiplier?: number;

  /**
   * 힐 배수
   * = (1스킬 힐비율) / (1스킬 쿨타임)
   */
  healDpsMultiplier?: number;

  /**
   * 1스킬 쉴드율
   * = (방어막 형성 시간) / (1스킬 쿨타임)
   */
  shieldSkillMultiplier?: number;

  /** 2스킬에 의한 상성 추가 공격력 */
  additionalAttackByType?: number;
}) => {
  /** 배수 효과 합친 것 */
  const mergedMultiplier = mergeMultipliers([
    levelMultiplier,
    classEffectMultiplier,
    skillMultiplier,
  ]);

  /** 공격력 */
  const attackPower = defaultAttackStat * mergedMultiplier.attackPoint;

  /** 회복속도 */
  const recoveryPower = defaultRecoveryStat * mergedMultiplier.staminaPoint;

  /** 체력 */
  const hpPower = defaultHpStat * mergedMultiplier.healthPoint;

  /** 크리티컬 확률 */
  const criticalChance = defaultCriticalChance / 100;

  /** 크리티컬 공격력 */
  const criticalDamage = defaultCriticalDamage;

  /** 기본 공격 DPS */
  const commonAttackDPS =
    (attackPower * (1 - criticalChance) +
      attackPower * criticalDamage * criticalChance) *
    CLICK_PER_SECOND;

  /** 스킬 DPS */
  const skillDPS = skillDpsMultiplier * attackPower;

  /** 힐량 환산 DPS보너스 */
  const healDPS = healDpsMultiplier * hpPower;

  /** DPS */
  const dps =
    (1 + (additionalAttackByType || 0) / 500 || 1) *
      (commonAttackDPS + skillDPS) +
    healDPS;

  /** 스킬 결합 체력 */
  const skillCombinedHealth = hpPower / (1 - shieldSkillMultiplier);

  /** 젤리 파워 */
  const jellyPower = Math.floor(
    Math.sqrt(dps * (skillCombinedHealth + 5 * recoveryPower))
  );

  return jellyPower;
};

/**
 * 배수 효과를 합칩니다
 * ex) 1.10 + 1.05 => 1.15
 */
const mergeMultipliers = (
  multipliers: StatMultiplier[]
): Required<StatMultiplier> => {
  return multipliers.reduce<Required<StatMultiplier>>(
    (prev, curr) => ({
      attackPoint: prev.attackPoint + ((curr?.attackPoint ?? 1) - 1),
      healthPoint: prev.healthPoint + ((curr?.healthPoint ?? 1) - 1),
      criticalChance: prev.criticalChance + ((curr?.criticalChance ?? 1) - 1),
      staminaPoint: prev.staminaPoint + ((curr?.staminaPoint ?? 1) - 1),
    }),
    {
      attackPoint: 1,
      healthPoint: 1,
      criticalChance: 1,
      staminaPoint: 1,
    }
  );
};
