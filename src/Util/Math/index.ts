import { factorial } from "./factorial";
import { sliceUnderPoint } from "./sliceUnderPoint";

export const MathUtil = {
  /**
   * 팩토리얼 함수.
   */
  factorial,

  /**
   * 실수 x에 대해서 소수점 n번째부터 m번째까지 자리수를 잘라와 수를 만듭니다.
   *
   * 예시:
   *    - `f(0.123, 2, 3) === 23`
   *    - `f(0.1233, 1, 2) === 12`
   *
   * @param x 자를 대상 숫자
   * @param n 소수점 몇 자리부터
   * @param m 소수점 몇 자리까지
   * @returns {number} 자른 숫자
   */
  sliceUnderPoint,
};
