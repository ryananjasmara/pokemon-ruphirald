import React, { useState } from "react";
import { Badge, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { pokedexNumberFormat } from "../../utils/StringManipulation";

const styles = {
  touched: {
    opacity: 0.75
  },
  notTouched: {
    opacity: 1
  }
};

function PokemonsCard({ index, pokemonName }) {
  const [isTouched, setIsTouched] = useState(false);
  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  // Mouse Down
  const handleTouched = () => {
    setIsTouched(!isTouched);
  };

  // Mouse Up
  const handleRevert = () => {
    setTimeout(() => {
      setIsTouched(false);
    }, 150);
  };

  return (
    <Card
      style={isTouched ? styles.touched : styles.notTouched}
      onMouseUp={handleRevert}
      onMouseDown={handleTouched}
    >
      <CardBody>
        <CardTitle>
          <Badge color="dark">{pokedexNumberFormat(index)}</Badge>
        </CardTitle>
        <CardSubtitle>{pokemonName}</CardSubtitle>
      </CardBody>
      <img width="200" src={pokemonImage} alt="" />
    </Card>
  );
}

export default PokemonsCard;
