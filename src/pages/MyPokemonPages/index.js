import React from "react";
import { connect } from "react-redux";
import { Container, Row, Button } from "reactstrap";
import { capitalizeFirstLetter } from "../../utils/CommonFunction";
import PokemonsCard from "../../components/PokemonsCard";
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

function MyPokemonPages(props) {
  const { myPokemon } = props;

  const handleBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  function renderMyPokemonTab() {
    return (
      <Row style={styles.cardContainer}>
        {myPokemon &&
          myPokemon.map((item, index) => {
            const pokemonName = capitalizeFirstLetter(item.species);
            const pokemonNick = item.nickname;
            const pokemonId = item.id;
            return (
              <PokemonsCard
                key={index}
                index={pokemonId}
                pokemonName={pokemonName}
                pokemonNick={pokemonNick}
              />
            );
          })}
      </Row>
    );
  }

  return (
    <>
    <NavigationsTab activeTab={PAGES.MY_POKEMON} />
    <Container>
      {/* Render MyPokemon */}
      {renderMyPokemonTab()}

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
    </>
  );
}

function mapStateToProps(state) {
  return {
    myPokemon: state.MyPokemonModels.data
  };
}

export default connect(mapStateToProps)(MyPokemonPages);
