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
): ReturnType<typeof setTimeout> => {
  return setTimeout(onTimeout, delayMs);
};

/**
 * Clears an event timeout
 */
export const clearEventTimeout = (timeoutId: ReturnType<typeof setTimeout>): void => {
  clearTimeout(timeoutId);
};
