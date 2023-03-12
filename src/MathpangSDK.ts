import { Clan } from "./Clan";
import { ReactMathpang } from "./React";
import { Util } from "./Util";

export const MathpangSDK = {
  clan: Clan,
  util: Util,
  react: ReactMathpang,
} as const;
