import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { DEFAULT_STATE } from "../stateType";
import { updatePackState, setCurrentEvent, clearCurrentEvent } from "../utils/stateHelpers";
import { createEventTimeout } from "../utils/eventHelpers";

let gameState = structuredClone(DEFAULT_STATE);
let eventTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Creates a pack mutation action (open/close)
 */
const createPackAction = (newState: "opened" | "closed") =>
  defineAction({
    input: z.object({
      color: z.enum(["blue", "red"]),
      index: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(0).max(9)),
    }),
    handler: async ({ color, index }) => {
      gameState = updatePackState(gameState, color, index, newState);
      return gameState;
    },
  });

const openPack = createPackAction("opened");
const closePack = createPackAction("closed");

const resetGame = defineAction({
  handler: async () => {
    if (eventTimeoutId) {
      clearTimeout(eventTimeoutId);
      eventTimeoutId = null;
    }
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
    gameState = setCurrentEvent(gameState, event);
    
    if (event === "call" && eventTimeoutId) {
      clearTimeout(eventTimeoutId);
    }
    
    if (event === "call") {
      eventTimeoutId = createEventTimeout(() => {
        gameState = clearCurrentEvent(gameState);
        eventTimeoutId = null;
      });
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
