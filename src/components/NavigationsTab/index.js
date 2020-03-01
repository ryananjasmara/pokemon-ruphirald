import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { PAGES } from '../../configs/constants';

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
  const { myPokemon, activeTab } = props;
  let myPokemonCounter = myPokemon && myPokemon.length;
  if (!myPokemonCounter) {
    myPokemonCounter = 0;
  }

  return (
    <Container style={styles.container}>
      <Link
        style={styles.link}
        to={`/`}
      >
        <Button
          style={styles.navButton}
          color={activeTab === PAGES.HOME ? "success" : "secondary"}
        >
          Pokédex List
        </Button>
      </Link>
      <Link
        style={styles.link}
        to={`/mypokemon`}
      >
        <Button
          disabled={myPokemonCounter === 0 ? true : false}
          style={styles.navButton}
          color={activeTab === PAGES.MY_POKEMON ? "success" : "secondary"}
        >
          {`My Pokémon (${myPokemonCounter})`}
        </Button>
      </Link>
      <Link
        style={styles.link}
        to={activeTab}
        onClick={() => {
          const confirm = window.confirm('Do you really want to clear your pokemon data?');
          if (confirm) {
            props.clearData();
          }
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
    clearData: () => dispatch({ type: "MyPokemonModels/clearData" })
  };
}

function mapStateToProps(state) {
  return {
    myPokemon: state.MyPokemonModels.data
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationsTab);
