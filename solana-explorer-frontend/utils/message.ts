
const programTypeList = [
  "return:", "log:", "Instruction:", "data:"
];

const distinguishLogMessage = (logMessage: string): string => {
  const parts = logMessage.split(" ");
  if (programTypeList.includes(parts[1]) || logMessage.includes("success")) {
    return logMessage;
  }
  const slicePart = parts.slice(2);
  return slicePart.join(" ");
};

export const groupLogMessages = (logMessages: string[]): string[][] => {
  const groupedMessages: string[][] = [];
  let currentGroup: string[] = [];
  let nestedGroup: string[] = [];
  let nestedLevel = 0;

  if (logMessages && logMessages.length > 0) {
    logMessages.forEach((message) => {
      if (message.includes("invoke")) {

        if (nestedLevel === 0 && currentGroup.length > 0) {
          groupedMessages.push(currentGroup);
          currentGroup = [];
        }

        nestedLevel++;
      } else {
        if (nestedLevel > 1) {
          const filterMessage = distinguishLogMessage(message);
          const prefix = "--- ".repeat(nestedLevel - 1);
          nestedGroup.push(`${prefix}${filterMessage}`);
        } else {
          const filterMessage = distinguishLogMessage(message);
          currentGroup.push(filterMessage);
        }
      }


      if (message.includes("success")) {
        nestedLevel--;

        if (nestedLevel === 1) {
          currentGroup.push(...nestedGroup);
          nestedGroup = [];
        } else if (nestedLevel === 0) {
          groupedMessages.push(currentGroup);
          currentGroup = [];
        }

      }

    });
  }

  return groupedMessages;
};
