import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { DEFAULT_STATE } from "../stateType";

let gameState = structuredClone(DEFAULT_STATE);
const openPack = defineAction({
  input: z.object({
    color: z.enum(["blue", "red"]),
    index: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(0).max(9)),
  }),
  handler: async ({ color, index }) => {
    if (color === "blue") {
      gameState.bluePacks[index] = "opened";
    } else if (color === "red") {
      gameState.redPacks[index] = "opened";
    }
    return gameState;
  },
});
const closePack = defineAction({
  input: z.object({
    color: z.enum(["blue", "red"]),
    index: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(0).max(9)),
  }),
  handler: async ({ color, index }) => {
    if (color === "blue") {
      gameState.bluePacks[index] = "closed";
    } else if (color === "red") {
      gameState.redPacks[index] = "closed";
    }
    return gameState;
  },
});
const resetGame = defineAction({
  handler: async () => {
    gameState = structuredClone(DEFAULT_STATE);
    return gameState;
  },
});

const getsPacksState = defineAction({
  handler: async () => gameState,
});

const sendEvent = defineAction({
  input: z.enum(["none", "call", "challenge"]),
  handler: async (event) => {
    gameState.currentEvent = event;
    if (event === "call") {
      const id = setInterval(() => {
        gameState.currentEvent = "none";
        clearInterval(id);
      }, 3000);
    }
  },
});

export const server = {
  openPack,
  getsPacksState,
  closePack,
  resetGame,
  sendEvent,
};
