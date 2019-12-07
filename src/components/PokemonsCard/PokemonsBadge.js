import React from "react";
import { Badge } from "reactstrap";

const resistant = ["water", "fire", "earth"];

function PokemonsBadge({ badgesTitle }) {
  return (
    <div>
      <small>{badgesTitle}</small>
      {resistant.map((item, index) => (
        <Badge key={String(index)} color="danger" pill>
          {item}
        </Badge>
      ))}
    </div>
  );
}

export default PokemonsBadge;
