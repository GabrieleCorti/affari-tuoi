import type { GameState } from "../stateType";

/**
 * Updates the disabled state of a button based on pack state
 */
export const updateButtonState = (
  color: "blue" | "red",
  index: number,
  isDisabled: boolean
): void => {
  const button = document.querySelector(
    `button[data-color="${color}"][data-index="${index}"]`
  ) as HTMLButtonElement | null;
  
  if (button) {
    button.disabled = isDisabled;
  }
};

/**
 * Updates all buttons based on the game state
 */
export const updateAllButtons = (gameState: GameState): void => {
  gameState.redPacks.forEach((packState, index) => {
    updateButtonState("red", index, packState === "opened");
  });

  gameState.bluePacks.forEach((packState, index) => {
    updateButtonState("blue", index, packState === "opened");
  });
};

/**
 * Gets an element by ID safely
 */
export const getElementById = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};

/**
 * Sets the aria-hidden attribute on an element
 */
export const setAriaHidden = (
  element: HTMLElement | null,
  hidden: boolean
): void => {
  if (element) {
    element.setAttribute("aria-hidden", hidden ? "true" : "false");
  }
};

/**
 * Updates event overlay visibility based on current event
 */
export const updateEventOverlays = (
  gameState: GameState
): void => {
  const callElement = getElementById("call");
  const challengeElement = getElementById("challenge");

  const shouldShowCall = gameState.currentEvent === "call";
  const shouldShowChallenge = gameState.currentEvent === "challenge";

  setAriaHidden(callElement, !shouldShowCall);
  setAriaHidden(challengeElement, !shouldShowChallenge);
};

/**
 * Updates the entire UI based on game state
 */
export const updateUI = (gameState: GameState): void => {
  updateAllButtons(gameState);
  updateEventOverlays(gameState);
};
