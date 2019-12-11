import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "reactstrap";
import IfComponent from "../../libs/IfComponent";
import PokemonsDetail from "../../components/PokemonsDetail";

const styles = {
  spinner: {
    marginTop: 25
  }
};

function DetailPages() {
  const [pokemonDetail, setPokemonDetail] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [isFetched]);

  async function getData() {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => {
      const { sprites } = res.data;
      const imageArray = [];
      for (const key in sprites) {
        const altText = key;
        const src = sprites[key];
        if (altText && src) {
          imageArray.push({ src, altText });
        }
      }
      imageArray.reverse();
      setPokemonImage(imageArray);
      setPokemonDetail(res.data);
      setIsFetched(true);
    });
  }

  return (
    <Container>
      {/* Conditional Render PokemonDetail or Spinner */}
      <IfComponent
        ifStatement={isFetched}
        thenRender={
          <PokemonsDetail
            pokemonId={id}
            pokemonDetail={pokemonDetail}
            pokemonImage={pokemonImage}
          />
        }
        otherRender={<Spinner color="success" style={styles.spinner}></Spinner>}
      />
    </Container>
  );
}

export default DetailPages;
