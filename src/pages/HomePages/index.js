import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Row, Container, Button } from "reactstrap";
import axios from "axios";
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
    fetchPokemonList(0);
  }, [])
  
  const handleBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  function renderPokedexTab(data) {
    return (
      <Row style={styles.cardContainer}>
        {data && data.map((item, index) => {
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
      <Footer isFetching={isFetching} countData={data && data.length} />

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
      dispatch({ type: "PokemonListModel/fetchPokemonList", payload: { offset: countData, limit: 10 } })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
