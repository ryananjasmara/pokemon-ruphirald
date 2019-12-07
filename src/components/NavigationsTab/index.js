import React from "react";
import { Button, ButtonGroup } from "reactstrap";

function NavigationsTab({ currentTab, clickHandle }) {
  return (
    <div className="pokedex-nav">
      <ButtonGroup>
        <Button
          onClick={() => {
            clickHandle(0);
          }}
          color={currentTab === 0 ? "success" : "secondary"}
        >
          List Pokémon
        </Button>
        <Button
          onClick={() => {
            clickHandle(1);
          }}
          color={currentTab === 1 ? "success" : "secondary"}
        >
          My Pokémon
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default NavigationsTab;
