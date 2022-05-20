import React from "react";
import { Carousel, Card } from "react-bootstrap";
const PaginationProduct = ({ products }) => {
  return (
    <Carousel
      className="pagy"
      variant="dark"
      style={{
        marginTop: "1rem",
        borderRadius: "30px",
      }}
    >
      {products.map((product) => (
        <Carousel.Item
          key={product._id}
          onClick={() => (window.location.href = `/product/${product._id}`)}
        >
          <Card
            style={{
              margin: " 3rem auto",
              height: "500px",
              padding: "1rem",
              width: "500px",
            }}
            className="card-pagy"
          >
            <img className="d-block " src={product.image} alt="First slide" />
            <Carousel.Caption>
              <h5>{product.name}</h5>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PaginationProduct;
