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
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  link: {
    textDecoration: "none"
  }
};

function NavigationsTab(props) {
  // pokemon count from rematch
  const { myPokemon } = props;
  let myPokemonCounter = myPokemon && myPokemon.length;
  if (!myPokemonCounter) {
    myPokemonCounter = 0;
  }
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
        style={styles.link}
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
        style={styles.link}
        to={`/mypokemon`}
        onClick={() => {
          setCurrentTab(1);
          saveToStorage(1);
        }}
      >
        <Button
          disabled={myPokemonCounter === 0 ? true : false}
          style={styles.navButton}
          color={currentTab === 1 ? "success" : "secondary"}
        >
          {`My Pokémon (${myPokemonCounter})`}
        </Button>
      </Link>
      <Link
        style={styles.link}
        to={`/`}
        onClick={() => {
          setCurrentTab(0);
          saveToStorage(0);
          props.clearData();
        }}
      >
        <Button
          disabled={myPokemonCounter === 0 ? true : false}
          style={styles.navButton}
          color="danger"
        >
          Clear Data
        </Button>
      </Link>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    clearData: () => dispatch({ type: "PokemonModels/clearData" })
  };
}

function mapStateToProps(state) {
  return {
    myPokemon: state.PokemonModels.data
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationsTab);
