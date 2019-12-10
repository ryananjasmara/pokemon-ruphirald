import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import axios from "axios";
import { capitalizeFirstLetter } from "../../utils/StringManipulation";
import Header from "../Templates/Header";
import Footer from "../Templates/Footer";
import NavigationsTab from "../NavigationsTab";
import PokemonsCard from "../PokemonsCard";
import PokemonsDetail from "../PokemonsDetail";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

function Pokedex() {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentData, setCurrentData] = useState(0);
  const [pokemonData, setPokemonData] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [movesData, setMovesData] = useState("");

  useEffect(() => {
    getData();
  }, [currentData]);

  function handleChangeTab(value) {
    setCurrentTab(value);
  }

  function handleLoadMore(value) {
    setCurrentData(value);
  }

  const handleBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  function getData() {
    const offset = currentData;
    const limit = 10;

    setIsFetching(true);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(res => {
        setPokemonData([...pokemonData, ...res.data.results]);
        setIsFetching(false);
      });
  }

  // Get All Moves Data
  function loadMoves() {
    // Total moves data length is 726
    // get by trial and error hit at the API
    // well, i know its static
    // but after looking at the API
    // this might be better choice.
    // for (let x = 1; x <= 726; x++) {
    //   axios.get(`https://pokeapi.co/api/v2/pokemon/move/${x}`).then(res => {
    //     setMovesData([...movesData, ...res.data.results]);
    //   });
    // }
  }

  loadMoves();

  return (
    <Container style={styles.container}>
      <Col>
        {/* Floating Button */}
        <Button
          color="success"
          className="button-float"
          onClick={handleBackToTop}
          style={styles.floatingButton}
        >
          <img src={require("../../assets/images/arrow_up.png")} />
        </Button>
        {/* Apps Title & Navigation */}
        <Header />
        <NavigationsTab currentTab={currentTab} clickHandle={handleChangeTab} />
        {/* Pokemons Card List */}
        <Row style={styles.cardContainer}>
          {pokemonData &&
            pokemonData.map((item, index) => {
              const pokemonName = capitalizeFirstLetter(item.name);
              return (
                <PokemonsCard index={index + 1} pokemonName={pokemonName} />
              );
            })}
        </Row>
        {/* <PokemonsDetail /> */}
        {/* Load More Button, etc */}
        <Footer
          isFetching={isFetching}
          clickHandle={handleLoadMore}
          dataCount={currentData}
        />
      </Col>
    </Container>
  );
}

export default Pokedex;
