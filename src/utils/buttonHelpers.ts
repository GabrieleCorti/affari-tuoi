import type { GameState } from "../stateType";

export const updateButtonAriaDisabled = (
  color: "blue" | "red",
  index: number,
  isDisabled: boolean
): void => {
  const button = document.querySelector(
    `button[data-color="${color}"][data-index="${index}"]`
  ) as HTMLButtonElement | null;
  if (button) {
    button.setAttribute("aria-disabled", isDisabled ? "true" : "false");
  }
};

export const updateAllPackButtons = (gameState: GameState): void => {
  gameState.redPacks.forEach((packState, index) => {
    updateButtonAriaDisabled("red", index, packState === "opened");
  });
  gameState.bluePacks.forEach((packState, index) => {
    updateButtonAriaDisabled("blue", index, packState === "opened");
  });
};
