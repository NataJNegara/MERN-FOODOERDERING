export function capitalizeFirst(word) {
  const firstLetter = word.charAt(0).toUpperCase();
  const restLetter = word.slice(1);
  const capitalize = firstLetter + restLetter;
  return capitalize;
}
