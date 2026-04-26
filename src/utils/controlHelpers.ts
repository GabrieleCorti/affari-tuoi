import { actions } from "astro:actions";
import { updateAllPackButtons, resetAllPackButtons } from "./buttonHelpers";

/**
 * Handles the reset button click
 */
export const handleResetClick = async (): Promise<void> => {
  try {
    const { data } = await actions.resetGame();
    if (!data) return;
    resetAllPackButtons();
  } catch (error) {
    console.error("Error resetting game:", error);
  }
};

/**
 * Handles the call button click
 */
export const handleCallClick = async (): Promise<void> => {
  try {
    await actions.sendEvent("call");
  } catch (error) {
    console.error("Error sending call event:", error);
  }
};

/**
 * Handles the challenge button click
 */
export const handleChallengeClick = async (): Promise<void> => {
  try {
    const { data } = await actions.getsPacksState();
    if (data && data.currentEvent === "challenge") {
      await actions.sendEvent("none");
    } else {
      await actions.sendEvent("challenge");
    }
  } catch (error) {
    console.error("Error sending challenge event:", error);
  }
};

/**
 * Attaches click handlers to control buttons
 */
export const attachControlButtonHandlers = (): void => {
  const resetButton = document.getElementById("reset");
  const callButton = document.getElementById("call");
  const challengeButton = document.getElementById("challenge");

  if (resetButton) {
    resetButton.addEventListener("click", handleResetClick);
  }

  if (callButton) {
    callButton.addEventListener("click", handleCallClick);
  }

  if (challengeButton) {
    challengeButton.addEventListener("click", handleChallengeClick);
  }
};
