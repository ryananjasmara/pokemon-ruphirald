import React, { useState } from "react";
import { Badge, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { pokedexNumberFormat } from "../../utils/CommonFunction";

const styles = {
  touched: {
    opacity: 0.5,
    marginTop: 20
  },
  notTouched: {
    opacity: 1,
    marginTop: 20
  }
};

function PokemonsCard({ index, pokemonName, handleChangePages }) {
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
    <Link to={`/detail/${index}`}>
      <Card
        style={isTouched ? styles.touched : styles.notTouched}
        onMouseUp={handleRevert}
        onMouseDown={handleTouched}
      >
        <CardBody>
          <CardTitle>
            <h4>
              <Badge color="dark">{pokedexNumberFormat(index)}</Badge>
            </h4>
          </CardTitle>
          <CardSubtitle>
            <h5>{pokemonName}</h5>
          </CardSubtitle>
        </CardBody>
        <img id={pokemonName} width="200" src={pokemonImage} alt="" />
      </Card>
    </Link>
  );
}

export default PokemonsCard;
