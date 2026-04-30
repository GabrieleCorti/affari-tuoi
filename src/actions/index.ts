import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { DEFAULT_STATE } from "../stateType";
import { updatePackState, setCurrentEvent, clearCurrentEvent } from "../utils/stateHelpers";
import { createEventTimeout } from "../utils/eventHelpers";
import { getState, setState, getCallTimeout, setCallTimeout } from "../lib/state";

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
      setState(updatePackState(getState(), color, index, newState));
    },
  });

const openPack = createPackAction("opened");
const closePack = createPackAction("closed");

const resetGame = defineAction({
  handler: async () => {
    const timeout = getCallTimeout();
    if (timeout) {
      clearTimeout(timeout);
      setCallTimeout(null);
    }
    setState(structuredClone(DEFAULT_STATE));
  },
});

const getsPacksState = defineAction({
  handler: async () => getState(),
});

const sendEvent = defineAction({
  input: z.enum(["none", "call", "challenge"]),
  handler: async (event) => {
    if (event === "call") {
      const existing = getCallTimeout();
      if (existing) clearTimeout(existing);
      setCallTimeout(
        createEventTimeout(() => {
          setState(clearCurrentEvent(getState()));
          setCallTimeout(null);
        })
      );
    }
    setState(setCurrentEvent(getState(), event));
  },
});

export const server = {
  openPack,
  getsPacksState,
  closePack,
  resetGame,
  sendEvent,
};
