import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Spinner, Col, Container } from "reactstrap";
import HomePages from "../../pages/HomePages";
import DetailPages from "../../pages/DetailPages";
import Header from "../Templates/Header";
import NavigationsTab from "../NavigationsTab";

const styles = {
  container: {
    display: "flex"
  }
};

const AppNavigator = () => {
  const [currentTab, setCurrentTab] = useState(0);

  function handleChangeTab(value) {
    setCurrentTab(value);
  }

  return (
    <Router>
      <Container style={styles.container}>
        <Col>
          {/* Apps Title & Navigation */}
          <Header />
          <NavigationsTab
            currentTab={currentTab}
            clickHandle={handleChangeTab}
          />

          {/* Switch Section - Will Render Depend The Page */}
          <Switch>
            <Route exact path="/">
              <HomePages />
            </Route>
            <Route path="/detail/:id">
              <DetailPages />
            </Route>
          </Switch>
        </Col>
      </Container>
    </Router>
  );
};

export default AppNavigator;
