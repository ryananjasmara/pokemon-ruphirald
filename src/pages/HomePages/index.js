import React, { useEffect, useCallback, useState } from "react";
import { connect } from 'react-redux';
import { Row, Container, Button, Spinner } from "reactstrap";
import { capitalizeFirstLetter } from "../../utils/CommonFunction";
import PokemonsCard from "../../components/PokemonsCard";
import IfComponent from "../../libs/IfComponent";
import NavigationsTab from "../../components/NavigationsTab";
import { PAGES } from '../../configs/constants';

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
  const onScrollEnded = useCallback(() => {
    const scrollTop = document.documentElement && document.documentElement.scrollTop;
    const offsetHeight = document.getElementById("root") && document.getElementById("root").offsetHeight;

    // debounce fetch
    const fetchCondition = window.innerHeight + scrollTop === offsetHeight;
    const debounce = setTimeout(() => {
      if (fetchCondition) {
        fetchPokemonList(pokemonList.data.length);
      }
    }, fetchCondition ? 250 : 0);
    // cleanup debounce timer
    return () => {
      clearTimeout(debounce);
    }
  }, [fetchPokemonList, pokemonList.data.length]);

  useEffect(() => {
    window.addEventListener("scroll", onScrollEnded);
    return () => {
      window.removeEventListener("scroll", onScrollEnded);
    }
  }, [onScrollEnded]);

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
      <>
      <NavigationsTab activeTab={PAGES.HOME} />
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
      </>
    );
  }

  const { isFetching, data } = pokemonList;

  return (
    <Container>
      {/* Render Pokedex */}
      {renderPokedexTab(data)}

      {/* Load More Button, etc */}
      <div className="footer">
        <IfComponent
          ifStatement={isFetching}
          thenRender={
            <Spinner color="success" />
          }
        />
      </div>

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
    pokemonList: state.PokemonListModels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonList: (countData) =>
      dispatch({ type: "PokemonListModels/fetchPokemonList", payload: { offset: countData } })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
