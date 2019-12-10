export function capitalizeFirstLetter(string) {
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalized;
}

export function pokedexNumberFormat(number) {
  const convertedNumber = number + "";
  const length = convertedNumber.length;
  switch (length) {
    case 1:
      return `#00${convertedNumber}`;
    case 2:
      return `#0${convertedNumber}`;
    default:
      return `#${convertedNumber}`;
  }
}
