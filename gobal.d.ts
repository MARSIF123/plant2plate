// global.d.ts
export {}; // ensures this file is a module

declare global {
  interface Window {
    google: typeof google; // fallback type so TS won't complain
  }
}
