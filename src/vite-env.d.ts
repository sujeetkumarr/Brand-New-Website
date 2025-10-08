/// <reference types="vite/client" />
/// <reference types="react/canary" />

// Fixes missing module errors for image imports (e.g., *.png)
declare module '*.png' {
  const src: string;
  export default src;
}

// Fixes missing module errors for custom Figma asset scheme (e.g., figma:asset/*)
declare module 'figma:asset/*' {
  const src: string;
  export default src;
}
