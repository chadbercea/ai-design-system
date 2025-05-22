declare const tokens: {
  [key: string]: string | number;
};

export default tokens;

declare module '*.mjs' {
  const content: any;
  export default content;
}

declare module '../../build/tokens.mjs' {
  export const borderRadiusSm: string;
  export const borderRadiusMd: string;
  export const borderRadiusLg: string;
  export const borderRadiusXl: string;
  export const borderRadiusNone: string;
  export const breakpointsXl: number;
  export const breakpointsLg: number;
  export const breakpointsMd: number;
  export const breakpointsSm: number;
  export const breakpointsXs: number;
  export const colorGrey50: string;
  export const colorGrey100: string;
  export const colorGrey200: string;
  export const colorGrey300: string;
  export const colorGrey400: string;
  export const colorGrey500: string;
  export const colorGrey600: string;
  export const colorGrey700: string;
  export const colorGrey800: string;
  export const colorGrey900: string;
  export const colorGreyA100: string;
  export const colorGreyA200: string;
  export const colorGreyA400: string;
  export const colorGreyA700: string;
  export const colorBlue50: string;
  export const colorBlue100: string;
  export const colorBlue200: string;
  export const colorBlue300: string;
  export const colorBlue400: string;
  export const colorBlue500: string;
  export const colorBlue600: string;
  export const colorBlue700: string;
  export const colorBlue800: string;
  export const colorBlue900: string;
  export const colorBlueA100: string;
  export const colorBlueA200: string;
  export const colorBlueA400: string;
  export const colorBlueA700: string;
  export const fontFamiliesRoboto: string;
  export const fontSizes48: string;
  export const fontSizes40: string;
  export const fontSizes32: string;
  export const fontSizes24: string;
  export const fontSizes21: string;
  export const fontSizes18: string;
  export const fontSizes16: string;
  export const fontSizes14: string;
  export const fontSizes12: string;
  export const fontWeightsBold: string;
  export const fontWeightsSemibold: string;
  export const fontWeightsMedium: string;
  export const fontWeightsRegular: string;
  export const lineHeights100: number;
  export const letterSpacingsDefault: string;
} 