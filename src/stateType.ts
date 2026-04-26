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

export type GameEvent = 'none' | 'call' | 'challenge'

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
  currentEvent: 'none',
};


