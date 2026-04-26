/**
 * Config for event timeout behavior
 */
export const EVENT_TIMEOUT_MS = 3000;

/**
 * Creates a timeout that resets the event to 'none' after specified ms
 */
export const createEventTimeout = (
  onTimeout: () => void,
  delayMs: number = EVENT_TIMEOUT_MS
): number => {
  return setTimeout(onTimeout, delayMs) as unknown as number;
};

/**
 * Clears an event timeout
 */
export const clearEventTimeout = (timeoutId: number): void => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
};
