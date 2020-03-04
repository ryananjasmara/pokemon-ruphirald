import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "reactstrap";
import IfComponent from "../../libs/IfComponent";
import CustomAlert from "../../libs/CustomAlert";
import PokemonsDetail from "../../components/PokemonsDetail";
import { formatCarouselCaption } from "../../utils/CommonFunction";
import NavigationsTab from "../../components/NavigationsTab";
import { PAGES } from '../../configs/constants';

const styles = {
  spinner: {
    marginTop: 25
  }
};

function DetailPages(props) {
  const [pokemonDetail, setPokemonDetail] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => {
      const { sprites } = res.data;
      const imageArray = [];
      for (const key in sprites) {
        const altText = formatCarouselCaption(key);
        const src = sprites[key];
        if (altText && src) {
          imageArray.push({ src, altText });
        }
      }
      const defaultSprite = [];
      const shinySprite = [];
      imageArray.reverse();
      imageArray.map((item) => {
        if (item.altText.includes('Shiny')) {
          shinySprite.push(item);
        } else {
          defaultSprite.push(item);
        }
      })
      // shiny chances
      const chance = Math.floor(Math.random() * 100);
      if (chance >= 50) {
        setPokemonImage(shinySprite);
        setIsDefault(false);
      } else {
        setPokemonImage(defaultSprite);
      }
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

  function modifiedRoutePath(tabName) {
    return tabName.replace(':id', id)
  }

  return (
    <>
    <NavigationsTab activeTab={modifiedRoutePath(PAGES.DETAIL_POKEMON)} id={id} />
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
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addData: payload =>
      dispatch({ type: "MyPokemonModels/handleData", payload })
  };
}

export default connect(null, mapDispatchToProps)(DetailPages);
