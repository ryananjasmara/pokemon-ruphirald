import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Container,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Col,
  Row,
  Jumbotron
} from "reactstrap";
import axios from "axios";

function PokemonsDetail() {
  const [pokemonDetail, setPokemonDetail] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  // Carousel Images
  const [pokemonImage, setPokemonImage] = useState("");

  const items = [
    {
      src: pokemonImage,
      altText: "Slide 1",
      caption: "Slide 1"
    },
    {
      src: pokemonImage,
      altText: "Slide 2",
      caption: "Slide 2"
    },
    {
      src: pokemonImage,
      altText: "Slide 3",
      caption: "Slide 3"
    }
  ];

  // State Carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Carousel Next Handle
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  // Carousel Previous Handle
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Carousel Go To Index Handle
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    getData();
  }, [isFetched]);

  function getData() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/1/`).then(res => {
      const { sprites } = res.data;
      const imageArray = [];
      for (const key in sprites) {
        const altText = key;
        const caption = key;
        const src = sprites[key];
        if (altText && caption && src) {
          imageArray.push({ src, altText, caption });
        }
      }
      setPokemonImage(imageArray);
      setPokemonDetail(res.data);
      setIsFetched(true);
    });
  }

  const slides =
    pokemonImage &&
    pokemonImage.map(item => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} width="400" />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

  const { moves } = pokemonDetail;

  console.log(pokemonImage);

  return (
    <Container style={{ marginTop: 25 }}>
      <Row>
        <Col>
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators
              items={items}
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
        </Col>
        <Col>
          <Table style={{ backgroundColor: "#ffffff" }}>
            <thead>
              <tr>
                <th>Moves List</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Col style={{ justifyContent: "space-evenly" }}>
                    <h4>
                      {moves &&
                        moves.map((item, index) => {
                          //   console.log(item);
                          return (
                            <Badge
                              color="dark"
                              key={index}
                              style={{ marginLeft: 5, marginRight: 5 }}
                            >
                              {item.move.name}
                            </Badge>
                          );
                        })}
                    </h4>
                  </Col>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default PokemonsDetail;
