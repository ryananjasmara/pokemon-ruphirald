import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Col, Container } from "reactstrap";
import HomePages from "../../pages/HomePages";
import DetailPages from "../../pages/DetailPages";
import MyPokemonpages from "../../pages/MyPokemonPages";
import Header from "../Templates/Header";
import { PAGES } from '../../configs/constants';

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

          {/* Switch Section - Will Render Depend The Page */}
          <Switch>
            <Route exact path={PAGES.HOME}>
              <HomePages />
            </Route>
            <Route path={PAGES.DETAIL_POKEMON}>
              <DetailPages />
            </Route>
            <Route path={PAGES.MY_POKEMON}>
              <MyPokemonpages />
            </Route>
          </Switch>
        </Col>
      </Container>
    </Router>
  );
};

export default AppNavigator;
