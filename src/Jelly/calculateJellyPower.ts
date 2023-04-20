// 일반공격 DPS = {(공격력) * (1 - 크리티컬 확률) + (공격력) * (크리티컬 공격력) * (크리티컬 확률)} * (초당 클릭 횟수 = 6)
// 스킬 DPS = (1스킬 스킬계수) * (공격력) / (1스킬 쿨타임)
// DPS = (일반공격 DPS + 스킬 DPS) * (1 + 2스킬 버프)
// 스킬 결합 체력 = (체력) / (1 - 1스킬 쉴드율)
// 힐량 환산 DPS보너스 = (1스킬 힐량) * 체력 / (1스킬 쿨타임)
// (Jelly Power) = sqrt((DPS + 힐량 환산 DPS보너스) * (스킬 결합 체력 + 5 * 회복속도))

export function calculateJellyPower({
  attackPoint,
  staminaPoint,
  healthPoint,
  criticalChance,
  criticalDamage,
}: {
  attackPoint: number;
  staminaPoint: number;
  healthPoint: number;
  criticalChance: number;
  criticalDamage: number;
}) {
  const normalAttackDps =
    (attackPoint * (1 - criticalChance) +
      attackPoint * criticalDamage * criticalChance) *
    6;

  const dps = normalAttackDps; // TODO: add skill dps
  const cp = Math.sqrt((dps + 0) * (healthPoint + 5 * staminaPoint));
  return Math.ceil(cp);
}
