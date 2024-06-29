export function capitalizeFirstLetter(str: string) {
  if (!str) return ""; // Handle empty strings or null/undefined
  return str.charAt(0).toUpperCase() + str.slice(1);
}
