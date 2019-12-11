import React from "react";
import { Container, Row } from "reactstrap";

const styles = {
  container: {
    marginTop: 10
  },
  header: {
    justifyContent: "center"
  }
};

function Header() {
  return (
    <Container style={styles.container}>
      <Row style={styles.header}>
        <h1>
          <font className="header-text">Pokémon&nbsp;</font>
          <font className="text-ruby">Ru</font>
          <font className="text-sapphire">phi</font>
          <font className="text-emerald">rald</font>
        </h1>
      </Row>
    </Container>
  );
}

export default Header;
