import React, { useState } from "react";
import {
  Badge,
  Container,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  Form,
  Input,
  FormGroup
} from "reactstrap";
import {
  formatCarouselCaption,
  pokedexNumberFormat,
  getColorType,
  capitalizeFirstLetter
} from "../../utils/CommonFunction";

const styles = {
  container: {
    marginBottom: 25
  },
  column: {
    marginTop: 25
  },
  carouselContainer: {
    backgroundColor: "#454545",
    borderRadius: 15,
    minWidth: 200,
    minHeight: 150
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15
  },
  detailsCardText: {
    textAlign: "start"
  },
  commonBadge: {
    marginRight: 5
  }
};

function PokemonsDetail({
  pokemonId,
  pokemonImage,
  pokemonDetail,
  handleSavePokemon
}) {
  // Props -> Pokemon Detail
  const { moves, abilities, types, species, weight, height } = pokemonDetail;
  // Moves Collapse
  const [isShow, setIsShow] = useState(false);
  const handleMovesCollapse = () => {
    setIsShow(!isShow);
  };
  // Catch Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAnimationPlay, setIsAnimationPlay] = useState(false);
  const [isResulting, setIsResulting] = useState(false);
  // State Carousel
  const [activeIndex, setActiveIndex] = useState(0);
  // Carousel Next Handle
  const next = () => {
    const nextIndex =
      activeIndex === pokemonImage.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  // Carousel Previous Handle
  const previous = () => {
    const nextIndex =
      activeIndex === 0 ? pokemonImage.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  // Carousel Go To Index Handle
  const goToIndex = newIndex => {
    setActiveIndex(newIndex);
  };
  // Carousel Items
  const slides =
    pokemonImage &&
    pokemonImage.map(item => {
      return (
        <CarouselItem key={item.src}>
          <img src={item.src} alt={item.altText} width="100%" />
          <CarouselCaption
            captionHeader={formatCarouselCaption(item.altText)}
            captionText={""}
          />
        </CarouselItem>
      );
    });
  // Render Carousel Component
  function renderCarousel() {
    return (
      <Carousel activeIndex={activeIndex} next={() => {}} previous={() => {}}>
        <CarouselIndicators
          items={pokemonImage}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    );
  }

  // Open Modal Handler
  function handleModalOpen() {
    setIsModalVisible(true);
    setIsAnimationPlay(true);
  }
  // Close Modal Handler
  function handleModalClose(success) {
    setIsModalVisible(false);
    setIsResulting(false);
    if (success) {
      const nickname = document.getElementById("pokenick").value;
      const data = {
        id: pokemonId,
        species: species.name,
        nickname
      };
      handleSavePokemon(data);
    }
  }
  // Render Modal Component
  function renderCatchModal() {
    return (
      <Modal isOpen={isModalVisible}>
        {isAnimationPlay ? playModalAnimation() : null}
        {isResulting ? catchResult() : null}
      </Modal>
    );
  }
  // Pokeball Animation
  function playModalAnimation() {
    setTimeout(() => {
      setIsAnimationPlay(false);
      setIsResulting(true);
    }, 3000);
    return (
      <ModalBody>
        <img
          src={require("../../assets/images/pokeball_catch.gif")}
          width="100%"
          alt=""
        />
      </ModalBody>
    );
  }
  // Catch Result
  function catchResult() {
    const result = Math.floor(Math.random() * 100);
    let data;
    if (result >= 50) {
      data = {
        success: true,
        title: "Congratulation !",
        message: `You've just caught ${capitalizeFirstLetter(
          species.name
        )}. Let's pick a nickname`
      };
    } else {
      data = {
        success: false,
        title: "Too Bad !",
        message: `You've failed to caught ${capitalizeFirstLetter(
          species.name
        )}.`
      };
    }
    return (
      <div>
        <ModalHeader
          toggle={() => {
            handleModalClose(false);
          }}
        >
          {data.title}
        </ModalHeader>
        <ModalBody>
          {data.message}
          {data.success ? (
            <Form style={{ marginTop: 15 }}>
              <FormGroup>
                <Input
                  id="pokenick"
                  type="text"
                  placeholder="pokemon nickname"
                />
              </FormGroup>
            </Form>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              handleModalClose(data.success);
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </div>
    );
  }

  function renderNormalRow(title, data) {
    return (
      <tr>
        <td>{title}</td>
        <td>:</td>
        <td>
          <Container>{data}</Container>
        </td>
      </tr>
    );
  }
  // Wanted to generally make function for these 3 (render types,abilities,moves)
  // but the data structure is make me confuse.
  // Each array have different key name
  // and i have no idea to process it.
  function renderTypesRow() {
    return (
      <tr>
        <td>Types</td>
        <td>:</td>
        <td>
          <Container>
            {types &&
              types.map((item, index) => {
                return (
                  <Badge
                    key={index}
                    style={{
                      marginRight: 5,
                      backgroundColor: getColorType(item.type.name)
                    }}
                  >
                    {item.type.name}
                  </Badge>
                );
              })}
          </Container>
        </td>
      </tr>
    );
  }

  function renderAbilitiesRow() {
    return (
      <tr>
        <td>Abilities</td>
        <td>:</td>
        <td>
          <Container>
            {abilities &&
              abilities.map((item, index) => {
                return (
                  <Badge key={index} color="info" style={styles.commonBadge}>
                    {item.ability.name}
                  </Badge>
                );
              })}
          </Container>
        </td>
      </tr>
    );
  }

  function renderMovesRow() {
    return (
      <tr>
        <td>Moves</td>
        <td>:</td>
        <td>
          <Container>
            <Badge
              onClick={handleMovesCollapse}
              color="warning"
              style={styles.commonBadge}
            >
              {!isShow ? "show all..." : "hide all..."}
            </Badge>
            <Collapse isOpen={isShow}>
              {moves &&
                moves.map((item, index) => {
                  return (
                    <Badge
                      key={index}
                      color="secondary"
                      style={styles.commonBadge}
                    >
                      {item.move.name}
                    </Badge>
                  );
                })}
            </Collapse>
          </Container>
        </td>
      </tr>
    );
  }

  return (
    <Container style={styles.container}>
      <Row>
        <Col style={styles.column}>
          <Container style={styles.carouselContainer}>
            {pokemonImage ? renderCarousel() : null}
          </Container>
        </Col>
        <Col style={styles.column}>
          <Card style={styles.detailsCard}>
            <CardBody>
              <CardTitle>
                <h4>
                  <Badge color="dark">{pokedexNumberFormat(pokemonId)}</Badge>
                </h4>
              </CardTitle>
              <CardTitle>
                <h5>{species ? capitalizeFirstLetter(species.name) : null}</h5>
              </CardTitle>
              <Container style={styles.detailsCardText}>
                <table>
                  <tbody>
                    {renderNormalRow("Weight", weight)}
                    {renderNormalRow("Height", height)}
                    {renderTypesRow()}
                    {renderAbilitiesRow()}
                    {renderMovesRow()}
                  </tbody>
                </table>
              </Container>
            </CardBody>
            <CardBody>
              <Button
                color="success"
                onClick={() => {
                  handleModalOpen();
                }}
              >
                Catch !!
              </Button>
            </CardBody>
          </Card>
        </Col>
        {isModalVisible ? renderCatchModal() : null}
      </Row>
    </Container>
  );
}

export default PokemonsDetail;
