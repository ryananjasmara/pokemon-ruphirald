import React, { useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";
import { Link } from "react-router-dom";
import { pokedexNumberFormat } from "../../utils/CommonFunction";
import IfComponent from "../../libs/IfComponent";

const styles = {
  touched: {
    opacity: 0.5,
    marginTop: 20
  },
  notTouched: {
    opacity: 1,
    marginTop: 20
  },
  link: {
    textDecoration: "none"
  }
};

function PokemonsCard({ index, pokemonName, pokemonNick, pokemonImage }) {
  const [isTouched, setIsTouched] = useState(false);

  const getPokemonImage = () => {
    console.log(pokemonImage);
    return pokemonImage || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  // Mouse Down
  const handleTouched = () => {
    setIsTouched(!isTouched);
  };

  // Mouse Up
  const handleRevert = () => {
    setTimeout(() => {
      setIsTouched(false);
    }, 100);
  };

  return (
    <Link
      style={styles.link}
      to={`/detail/${index}`}
      onMouseEnter={handleTouched}
      onMouseLeave={handleRevert}
    >
      <Card style={isTouched ? styles.touched : styles.notTouched}>
        <CardBody>
          <CardTitle>
            <h4>
              <Badge color="dark">{pokedexNumberFormat(index)}</Badge>
            </h4>
          </CardTitle>
          <CardSubtitle>
            <h5>{pokemonName}</h5>
          </CardSubtitle>
          <IfComponent
            ifStatement={pokemonNick}
            thenRender={<CardText>({pokemonNick})</CardText>}
          />
        </CardBody>
        <img id={pokemonName} width="200" src={getPokemonImage()} alt="" />
      </Card>
    </Link>
  );
}

export default PokemonsCard;
