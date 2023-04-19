import { Clan } from "./Clan";
import { Jelly } from "./Jelly";
import { ReactMathpang } from "./React";
import { Util } from "./Util";

export const MathpangSDK = {
  clan: Clan,
  util: Util,
  jelly: Jelly,
  react: ReactMathpang,
} as const;
