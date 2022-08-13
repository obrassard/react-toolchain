import tinycolor from "tinycolor2";

export const isLightColor = (hexColor: string) => {
  const colorObj = tinycolor(hexColor);
  return colorObj?.isLight();
};

const defaultRatio = 5;
export const getContrastedColor = (hexColor: string, ratio?: number) => {
  const colorObj = tinycolor(hexColor);
  if (colorObj.isLight()) {
    return colorObj.darken(ratio ?? defaultRatio).toHexString();
  } else {
    return colorObj.lighten(ratio ?? defaultRatio).toHexString();
  }
};

export const getLightenColor = (hexColor: string, ratio = 25) => {
  if (hexColor === "#ffffff") {
    return getDarkenColor(hexColor);
  }
  const colorObj = tinycolor(hexColor);
  const hsl = colorObj.saturate(100).toHsl();
  hsl.l = ratio / 100;
  return tinycolor(hsl).toHex8String();
};

export const getDarkenColor = (hexColor: string, ratio?: number) => {
  const colorObj = tinycolor(hexColor);
  return colorObj.darken(ratio ?? defaultRatio).toHexString();
};

export const getColorAnalogous = (hexColor: string, position?: number) => {
  const colorObj = tinycolor(hexColor);
  return colorObj.analogous()[position ?? 1].toHexString();
};

export const getColorTriad = (hexColor: string, position?: number) => {
  const colorObj = tinycolor(hexColor);
  return colorObj.triad()[position ?? 1].toHexString();
};

export const getColorTetrad = (hexColor: string, position?: number) => {
  const colorObj = tinycolor(hexColor);
  return colorObj.tetrad()[position ?? 1].toHexString();
};

export const getColorSplitComplement = (
  hexColor: string,
  position?: number
) => {
  const colorObj = tinycolor(hexColor);
  return colorObj.splitcomplement()[position ?? 1].toHexString();
};

export const getColorMonochromatic = (hexColor: string, position?: number) => {
  const colorObj = tinycolor(hexColor);
  return colorObj.monochromatic()[position ?? 1].toHexString();
};
