export const formatString = (
  text: string | null | undefined,
  type: "short" | "long" | "shorter" | "longer",
  startIndex?: number,
) => {
  if (!text) return;

  const startFromIndex = startIndex || 0;
  if (type === "short") {
    return `${text.slice(0 + startFromIndex, 5 + startFromIndex)}...${text.slice(-5)}`;
  }

  if (type === "shorter") {
    return `${text.slice(0 + startFromIndex, 4 + startFromIndex)}...${text.slice(-4)}`;
  }

  if (type === "longer") {
    return `${text.slice(0 + startFromIndex, 11 + startFromIndex)}...${text.slice(-11)}`;
  }

  return `${text.slice(0 + startFromIndex, 8 + startFromIndex)}...${text.slice(-8)}`;
};
