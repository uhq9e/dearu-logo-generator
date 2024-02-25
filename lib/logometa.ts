import type { LogoMeta } from "./types/shared";
import nowayuBg from "../assets/backgrounds/nowayu_bg.svg";
import kumeyuBg from "../assets/backgrounds/kumeyu_bg.svg";

/**
 * NoWaYu (Nogi Wakaba is a Hero) logo meta
 */
export const nowayu: LogoMeta = {
  backgroundImage: nowayuBg,
  outlineBoxColor: "#ffffff",
  backgroundBoxColor: "#2962c5",
  foregroundBoxColor: "#ebf766",
  textColor: "#2962c5",
  textHighlightColor: "#ffffff",
  lineBeginOffset: [0.204, 0.31],
  centerOffsetX: 0.5,
  lineOrigLength: [5, 5],
};

/**
 * KuMeYu (Kusunoki Mebuki is a Hero) logo meta
 */
export const kumeyu: LogoMeta = {
  backgroundImage: kumeyuBg,
  outlineBoxColor: "#ffffff",
  backgroundBoxColor: "#5d786d",
  foregroundBoxColor: "#f4f6f6",
  textColor: "#5d786d",
  textHighlightColor: "#f4f6f6",
  lineBeginOffset: [0.234, 0.308],
  centerOffsetX: 0.5,
  lineOrigLength: [5, 5],
};
