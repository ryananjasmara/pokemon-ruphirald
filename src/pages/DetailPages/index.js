import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "reactstrap";
import IfComponent from "../../libs/IfComponent";
import CustomAlert from "../../libs/CustomAlert";
import PokemonsDetail from "../../components/PokemonsDetail";

const styles = {
  spinner: {
    marginTop: 25
  }
};

function DetailPages(props) {
  const [pokemonDetail, setPokemonDetail] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [isFetched]);

  function getData() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => {
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

  function handleSavePokemon(pokemonData) {
    props.addData(pokemonData);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
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
            handleSavePokemon={handleSavePokemon}
          />
        }
        otherRender={<Spinner color="success" style={styles.spinner}></Spinner>}
      />
      <IfComponent
        ifStatement={isAlertVisible}
        thenRender={
          <CustomAlert message="Sucessfully Catch Pokemon" color="success" />
        }
      />
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addData: payload => dispatch({ type: "PokemonModels/handleData", payload })
  };
}

export default connect(null, mapDispatchToProps)(DetailPages);
