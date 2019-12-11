import React, { useState, useEffect } from "react";
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
  CardText,
  Button
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
    minWidth: 250
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

function PokemonsDetail({ pokemonId, pokemonImage, pokemonDetail }) {
  // State Carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  // Carousel Next Handle
  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === pokemonImage.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  // Carousel Previous Handle
  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? pokemonImage.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  // Carousel Go To Index Handle
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides =
    pokemonImage &&
    pokemonImage.map(item => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} width="100%" />
          <CarouselCaption
            captionHeader={formatCarouselCaption(item.altText)}
          />
        </CarouselItem>
      );
    });
  function renderCarousel() {
    return (
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
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

  const { moves, abilities, types, species, weight, height } = pokemonDetail;

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
              <CardText style={styles.detailsCardText}>
                <table>
                  <tr>
                    <td>Weight</td>
                    <td>:</td>
                    <td>
                      <Container>{weight}</Container>
                    </td>
                  </tr>
                  <tr>
                    <td>Height</td>
                    <td>:</td>
                    <td>
                      <Container>{height}</Container>
                    </td>
                  </tr>
                  <tr>
                    <td>Types</td>
                    <td>:</td>
                    <td>
                      <Container>
                        {types &&
                          types.map(item => {
                            return (
                              <Badge
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
                  <tr>
                    <td>Abilities</td>
                    <td>:</td>
                    <td>
                      <Container>
                        {abilities &&
                          abilities.map(item => {
                            return (
                              <Badge color="info" style={styles.commonBadge}>
                                {item.ability.name}
                              </Badge>
                            );
                          })}
                      </Container>
                    </td>
                  </tr>
                  <tr>
                    <td>Moves</td>
                    <td>:</td>
                    <td>
                      <Container>
                        {moves &&
                          moves.map(item => {
                            return (
                              <Badge
                                color="secondary"
                                style={styles.commonBadge}
                              >
                                {item.move.name}
                              </Badge>
                            );
                          })}
                      </Container>
                    </td>
                  </tr>
                </table>
              </CardText>
            </CardBody>
            <CardBody>
              <Button color="primary">Catch</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PokemonsDetail;
