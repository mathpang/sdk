import { MathUtil } from "./Math";
import { PromiseUtil } from "./Promise";

export const Util = {
  math: MathUtil,
  promise: PromiseUtil,
} as const;
