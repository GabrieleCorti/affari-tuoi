import type { GameState } from "../stateType";
import { actions } from "astro:actions";
import { bumpVersion, isLatestVersion } from "./requestVersion";

/**
 * Updates button aria-disabled state based on pack state
 */
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

/**
 * Updates all pack buttons based on game state
 */
export const updateAllPackButtons = (gameState: GameState): void => {
  gameState.redPacks.forEach((packState, index) => {
    updateButtonAriaDisabled("red", index, packState === "opened");
  });

  gameState.bluePacks.forEach((packState, index) => {
    updateButtonAriaDisabled("blue", index, packState === "opened");
  });
};

/**
 * Resets all pack buttons to closed state
 */
export const resetAllPackButtons = (): void => {
  document.querySelectorAll("button[data-color][data-index]").forEach((button) => {
    button.setAttribute("aria-disabled", "false");
  });
};

/**
 * Gets the aria-disabled state of a button
 */
export const getButtonAriaDisabled = (button: HTMLElement): boolean => {
  return button.getAttribute("aria-disabled") === "true";
};

/**
 * Handles pack button click events
 */
export const handlePackButtonClick = async (
  button: HTMLButtonElement
): Promise<void> => {
  const color = button.dataset.color as "red" | "blue" | undefined;
  const index = button.dataset.index as string | undefined;

  if (!color || !index) return;

  const isCurrentlyOpened = getButtonAriaDisabled(button);
  const myVersion = bumpVersion();

  try {
    const state = isCurrentlyOpened
      ? await actions.closePack({ color, index })
      : await actions.openPack({ color, index });

    if (state.data && isLatestVersion(myVersion)) {
      updateAllPackButtons(state.data);
    }
  } catch (error) {
    console.error("Error toggling pack:", error);
  }
};

/**
 * Attaches click handlers to all pack buttons
 */
export const attachPackButtonHandlers = (): void => {
  document.querySelectorAll("button[data-color][data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      handlePackButtonClick(button as HTMLButtonElement);
    });
  });
};
