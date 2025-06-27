declare module '*.png';
declare module '*.jpg';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare global {
  var Buffer: typeof Buffer;
  var global: typeof globalThis;
}

export {};
