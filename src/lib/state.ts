import type { GameState } from '../stateType';
import { DEFAULT_STATE } from '../stateType';

declare global {
  var __gameState: GameState | undefined;
  var __broadcast: ((state: GameState) => void) | undefined;
  var __callTimeout: ReturnType<typeof setTimeout> | null | undefined;
}

globalThis.__gameState ??= structuredClone(DEFAULT_STATE);
globalThis.__callTimeout ??= null;

export const getState = (): GameState => globalThis.__gameState!;

export const setState = (newState: GameState): void => {
  globalThis.__gameState = newState;
  globalThis.__broadcast?.(newState);
};

export const setBroadcast = (fn: (state: GameState) => void): void => {
  globalThis.__broadcast = fn;
};

export const getCallTimeout = (): ReturnType<typeof setTimeout> | null =>
  globalThis.__callTimeout ?? null;

export const setCallTimeout = (id: ReturnType<typeof setTimeout> | null): void => {
  globalThis.__callTimeout = id;
};
//a
