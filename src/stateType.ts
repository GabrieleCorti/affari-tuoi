export type PackState = "closed" | "opened";

export type Packs = [
  PackState,
  PackState,
  PackState,
  PackState,
  PackState,
  PackState,
  PackState,
  PackState,
  PackState,
  PackState,
];

export type GameEvent = "none" | "call" | "challenge";

export interface GameState {
  redPacks: Packs;
  bluePacks: Packs;
  currentEvent: GameEvent;
}

export const DEFAULT_STATE: GameState = {
  bluePacks: [
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
  ],
  redPacks: [
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
    "closed",
  ],
  currentEvent: "none",
};

export const blue = [
  "Buonanotte da Roby e Banza",
  "Sfida o cestino cortesia",
  "Scelta preghiera del giorno",
  "Sfida o cestino cortesia",
  "100€",
  "Sfida o cestino cortesia",
  "Cassa d'acqua",
  "Sfida o cestino cortesia",
  "Svegliarsi 30 minuti prima",
  "Servizio bagagli edu",
] as const;
export const red = [
  "Sfida o cioccolatini",
  "2€ caramelle",
  "Sfida o cioccolatini",
  "Souvenir assisi",
  "Sfida o cioccolatini",
  "Regalo",
  "Sfida o cioccolatini",
  "Regalo",
  "Regalo",
  "Servizio bagagli",
] as const;
