/**
 * Truncates a string in the middle to a specified length.
 *
 * @param str The string to truncate.
 * @param frontLen The number of characters to keep at the start.
 * @param backLen The number of characters to keep at the end.
 * @param truncateStr The string to insert in the middle (usually ellipsis).
 * @returns The truncated string.
 */
export const truncateMiddle = (
  str: string,
  frontLen: number = 6,
  backLen: number = 4,
  truncateStr: string = '...',
): string => {
  if (!str) return '--';
  if (str.length <= frontLen + backLen) {
    return str;
  }
  const front = str.slice(0, frontLen);
  const back = str.slice(-backLen);
  return front + truncateStr + back;
};
