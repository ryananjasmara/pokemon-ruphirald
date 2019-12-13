import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 15
  },
  navButton: {
    marginLeft: 5,
    marginRight: 5
  }
};

function NavigationsTab(props) {
  // pokemon count from rematch
  const { myPokemon } = props;
  const myPokemonCounter = myPokemon.length;
  // locally get last active tab index incase if page reloaded
  const localCurrentTab = localStorage.getItem("curr");
  // if the local data empty, the initial state will be 0
  let initialCurrentTab = 0;
  if (localCurrentTab) {
    initialCurrentTab = parseInt(localCurrentTab);
  }
  // state for tab active
  const [currentTab, setCurrentTab] = useState(initialCurrentTab);
  // handle to save state to storage
  function saveToStorage(value) {
    localStorage.setItem("curr", value);
  }

  return (
    <Container style={styles.container}>
      <Link
        to={`/`}
        onClick={() => {
          setCurrentTab(0);
          saveToStorage(0);
        }}
      >
        <Button
          style={styles.navButton}
          color={currentTab === 0 ? "success" : "secondary"}
        >
          Pokédex List
        </Button>
      </Link>
      <Link
        to={`/mypokemon`}
        onClick={() => {
          setCurrentTab(1);
          saveToStorage(1);
        }}
      >
        <Button
          style={styles.navButton}
          color={currentTab === 1 ? "success" : "secondary"}
        >
          {`My Pokémon (${myPokemonCounter})`}
        </Button>
      </Link>
    </Container>
  );
}

function mapStateToProps(state) {
  console.log(state.PokemonModels);
  return {
    myPokemon: state.PokemonModels.data
  };
}

export default connect(mapStateToProps)(NavigationsTab);
