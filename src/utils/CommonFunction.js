export function capitalizeFirstLetter(string) {
  const capitalized =
    string && string.charAt(0).toUpperCase() + string.slice(1);
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

export function formatCarouselCaption(string) {
  let result;
  const arrayString = string.split("_");
  arrayString.map((item, index) => {
    switch (index) {
      case 0:
        result = capitalizeFirstLetter(item);
        break;
      case 1:
      case 2:
      case 3:
        result += " " + capitalizeFirstLetter(item);
        break;
      default:
        break;
    }
  });
  return result;
}

export function getColorType(type) {
  switch (type) {
    case "normal":
      return "#ADADA0";
    case "fighting":
      return "#FD6F72";
    case "flying":
      return "#4DC9EC";
    case "poison":
      return "#E492F1";
    case "ground":
      return "#4DC9EC";
    case "rock":
      return "#CA9F56";
    case "bug":
      return "#9EC88F";
    case "ghost":
      return "#AB73F0";
    case "steel":
      return "#B8B9CE";
    case "fire":
      return "#FC8E45";
    case "water":
      return "#659AF0";
    case "grass":
      return "#89E88D";
    case "electric":
      return "#E0DF4B";
    case "psychic":
      return "#FE38A3";
    case "ice":
      return "#00D9CF";
    case "dragon":
      return "#FD6F72";
    case "dark":
      return "#918888";
    case "fairy":
      return "#FF66CF";
    case "unknown":
      return "#000000";
    case "shadow":
      return "#5C5A56";
    default:
      return null;
  }
}
