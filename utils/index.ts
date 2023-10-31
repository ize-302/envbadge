export const pluralize = (text: string, count: number) => {
  if (count === -1) return text;

  // last letter with ch
  if (text.slice(-2) === "ch") return count === 1 ? text : `${text}es`;

  let lastLetter = text.slice(-1);
  return lastLetter === "y"
    ? count === 1
      ? text
      : `${text.slice(0, -1)}ies`
    : count === 1
    ? text
    : `${text}s`;
};
