import React, { useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Col, Container } from "reactstrap";
import HomePages from "../../pages/HomePages";
import DetailPages from "../../pages/DetailPages";
import MyPokemonpages from "../../pages/MyPokemonPages";
import Header from "../Templates/Header";
import NavigationsTab from "../NavigationsTab";

const styles = {
  container: {
    display: "flex"
  }
};

const AppNavigator = () => {
  return (
    <Router>
      <Container style={styles.container}>
        <Col>
          {/* Apps Title & Navigation */}
          <Header />
          <NavigationsTab />

          {/* Switch Section - Will Render Depend The Page */}
          <Switch>
            <Route exact path="/">
              <HomePages />
            </Route>
            <Route path="/detail/:id">
              <DetailPages />
            </Route>
            <Route path="/mypokemon">
              <MyPokemonpages />
            </Route>
          </Switch>
        </Col>
      </Container>
    </Router>
  );
};

export default AppNavigator;
