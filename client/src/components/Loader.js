import React from "react";
import { Container, Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        style={{}}
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
      />
    </Container>
  );
};
export default Loader;
