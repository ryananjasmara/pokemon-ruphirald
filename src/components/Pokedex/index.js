import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";
import Header from "../Header";
import NavigationsTab from "../NavigationsTab";

function Pokedex() {
  const [currentTab, setCurrentTab] = useState(0);

  function handleChangeTab(value) {
    setCurrentTab(value);
    console.log("jalan");
  }

  return (
    <div className="container">
      <Header />
      <NavigationsTab currentTab={currentTab} clickHandle={handleChangeTab} />

      {/* Card */}
      <div className="card">
        <Card>
          <CardImg
            top
            width="100%"
            src="/assets/318x180.svg"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
      {/* End Card */}
    </div>
  );
}

export default Pokedex;
