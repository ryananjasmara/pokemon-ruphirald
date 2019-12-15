import React from "react";
import { Alert, Container } from "reactstrap";

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  floatingAlert: {
    position: "fixed",
    bottom: 5,
    left: 15
  }
};

function CustomAlert({ color, message }) {
  return (
    <Container style={styles.container}>
      <Alert style={styles.floatingAlert} color={color}>
        {message}
      </Alert>
    </Container>
  );
}

export default CustomAlert;
