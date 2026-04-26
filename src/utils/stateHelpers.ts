import type { GameState, Packs, PackState } from "../stateType";

/**
 * Updates the state of a specific pack in the game state
 */
export const updatePackState = (
  gameState: GameState,
  color: "blue" | "red",
  index: number,
  state: PackState
): GameState => {
  const newState = structuredClone(gameState);
  if (color === "blue") {
    newState.bluePacks[index] = state;
  } else if (color === "red") {
    newState.redPacks[index] = state;
  }
  return newState;
};

/**
 * Sets the current event and returns the updated state
 */
export const setCurrentEvent = (
  gameState: GameState,
  event: GameState["currentEvent"]
): GameState => {
  const newState = structuredClone(gameState);
  newState.currentEvent = event;
  return newState;
};

/**
 * Clears the current event by setting it to 'none'
 */
export const clearCurrentEvent = (gameState: GameState): GameState => {
  return setCurrentEvent(gameState, "none");
};

/**
 * Gets the packs for a specific color
 */
export const getPacksByColor = (
  gameState: GameState,
  color: "blue" | "red"
): Packs => {
  return color === "blue" ? gameState.bluePacks : gameState.redPacks;
};
