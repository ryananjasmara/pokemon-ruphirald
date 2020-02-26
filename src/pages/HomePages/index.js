<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
=======
import React, { useEffect } from "react";
import { connect } from 'react-redux';
>>>>>>> 4719dc5a555e44580f85c1b9b480aa0e5cef81f4
import { Row, Container, Button } from "reactstrap";
import { capitalizeFirstLetter } from "../../utils/CommonFunction";
import Footer from "../../components/Templates/Footer";
import PokemonsCard from "../../components/PokemonsCard";

const styles = {
  container: {
    display: "flex"
  },
  cardContainer: {
    justifyContent: "space-evenly",
    marginBottom: 25
  },
  floatingButton: {
    borderRadius: 1000,
    position: "fixed",
    right: 15,
    bottom: 15
  }
};

function HomePages({ handleChangePages, pokemonList, fetchPokemonList }) {

  useEffect(() => {
    if (pokemonList.data.length === 0){
      fetchPokemonList(0);
    }
  }, [fetchPokemonList, pokemonList.data.length])
  
  const handleBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  function renderPokedexTab(data) {
    return (
      <Row style={styles.cardContainer}>
        {data.map((item, index) => {
            const pokemonName = capitalizeFirstLetter(item.name);
            return (
              <PokemonsCard
                key={index}
                index={index + 1}
                pokemonName={pokemonName}
                handleChangePages={handleChangePages}
              />
            );
          })}
      </Row>
    );
  }

  const { isFetching, data } = pokemonList;

  return (
    <Container>
      {/* Render Pokedex */}
      {renderPokedexTab(data)}

      {/* Load More Button, etc */}
      <Footer isFetching={isFetching} countData={data.length} />

      {/* Floating Button */}
      <Button
        color="success"
        className="button-float"
        onClick={handleBackToTop}
        style={styles.floatingButton}
      >
        <img src={require("../../assets/images/arrow_up.png")} alt="" />
      </Button>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    pokemonList: state.PokemonListModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonList: (countData) =>
      dispatch({ type: "PokemonListModel/fetchPokemonList", payload: { offset: countData } })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
