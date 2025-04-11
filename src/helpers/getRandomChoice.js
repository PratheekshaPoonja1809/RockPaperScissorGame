export const getRandomChoice = (options) => {
  if (!Array.isArray(options) || options.length === 0) return "";
  const index = Math.floor(Math.random() * options.length);
  return options[index];
};