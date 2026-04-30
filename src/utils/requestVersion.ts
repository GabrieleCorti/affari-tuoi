let version = 0;
export const bumpVersion = (): number => ++version;
export const isLatestVersion = (v: number): boolean => v === version;
