import type { ILogoMeta } from "./types/shared";
import nowayuBg from "../assets/backgrounds/nowayu_bg.svg";
import kumeyuBg from "../assets/backgrounds/kumeyu_bg.svg";
import wasuyuBg from "../assets/backgrounds/wasuyu_bg.svg";
import uhimiBg from "../assets/backgrounds/uhimi_bg.svg";

/**
 * NoWaYu (Nogi Wakaba is a Hero) logo meta
 */
export const nowayu: ILogoMeta = {
  backgroundImage: nowayuBg,
  outlineColor: "#ffffff",
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
export const kumeyu: ILogoMeta = {
  backgroundImage: kumeyuBg,
  outlineColor: "#ffffff",
  backgroundBoxColor: "#5d786d",
  foregroundBoxColor: "#f4f6f6",
  textColor: "#5d786d",
  textHighlightColor: "#f4f6f6",
  lineBeginOffset: [0.234, 0.308],
  centerOffsetX: 0.5,
  lineOrigLength: [5, 5],
};

/**
 * WaSuYu (Washio Sumi is a Hero) logo meta
 */
export const wasuyu: ILogoMeta = {
  backgroundImage: wasuyuBg,
  outlineColor: "#ffffff",
  backgroundBoxColor: "#394c8f",
  foregroundBoxColor: "#c6c8e5",
  textColor: "#394c8f",
  textHighlightColor: "#ffffff",
  lineBeginOffset: [0.2116, 0.3138],
  centerOffsetX: 0.5,
  lineOrigLength: [5, 5],
};

/**
 * UHiMi (Uesato Hinata is a Miko) logo meta
 */
export const uhimi: ILogoMeta = {
  backgroundImage: uhimiBg,
  outlineColor: "#ffffff",
  backgroundBoxColor: "#d71517",
  foregroundBoxColor: "#ffffff",
  textColor: "#d71517",
  textHighlightColor: "#ffffff",
  lineBeginOffset: [0.1885, 0.254],
  centerOffsetX: 0.5,
  lineOrigLength: [6, 5],
};
