import bs58 from "bs58";

export const base58ToHex = (base58String: string) => {
  if (base58String) {
    const bytes = bs58.decode(base58String);
    return Buffer.from(bytes).toString("hex");
  }
  return base58String;
};

export const splitHexEveryTwoDigitsWithSpace = (hexString: string): string => {
  if (hexString) {
    const splitArray = hexString.match(/.{1,2}/g) || [];
    return splitArray.join(" ");
  }
  return hexString;
};

const groupLogMessages = (logMessages: string[]): string[][] => {
  const groupedMessages: string[][] = [];
  const invokePattern = /invoke \[\d+\]/;
  const successPattern = /success/;

  for (let i = 0; i < logMessages.length; i++) {
    if (invokePattern.test(logMessages[i])) {
      const invokeMessage = logMessages[i];
      const successMessage = logMessages.find((msg, index) => index > i && successPattern.test(msg) && msg.includes(invokeMessage.split(" ")[1]));
      if (successMessage) {
        groupedMessages.push([invokeMessage, successMessage]);
      }
    }
  }

  return groupedMessages;
};
