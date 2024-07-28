export const shortenStringWithDot = (originalString: string, length: number): string => {
  const showString = originalString.slice(0, length);
  return `${showString}...`;
};
