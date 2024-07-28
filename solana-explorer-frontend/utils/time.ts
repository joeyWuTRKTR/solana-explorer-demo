export const timestampInSecondToDatetime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  return `${formattedDate} UTC`;
};

export const timestampInSecondsToUserTimezone = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const offset = -date.getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const formattedOffset = `GMT${offset >= 0 ? "+" : "-"}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  const formattedDate = date.toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  return `${formattedDate} ${formattedOffset}`;
};

export const timestampToNowInHourAndMinute = (timestamp: number): string => {
  const now = Date.now();
  const diffInMs = now - timestamp * 1000; // Convert seconds to milliseconds
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};
