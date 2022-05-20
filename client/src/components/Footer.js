import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer style={{ color: "#466978" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; E-commerce</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
