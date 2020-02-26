import React from "react";
import { connect } from 'react-redux';
import { Button, Spinner } from "reactstrap";
import IfComponent from "../../libs/IfComponent";

function Footer({ isFetching, countData, fetchPokemonList }) {
  return (
    <div className="footer">
      <IfComponent
        ifStatement={!isFetching}
        thenRender={
          <Button
            color="success"
            onClick={() => {
              fetchPokemonList(countData);
            }}
          >
            Load More
          </Button>
        }
        otherRender={<Spinner color="success" />}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonList: (countData) =>
      dispatch({ type: "PokemonListModels/fetchPokemonList", payload: { offset: countData } })
  };
}

export default connect(null, mapDispatchToProps)(Footer);
