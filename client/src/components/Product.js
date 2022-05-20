import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { Card } from "react-bootstrap";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-1 rounded product_item"
      style={{ backgroundColor: "var(--black2-color)", color: "#fff" }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img className="image" src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <h5 style={{ color: "#fff" }}>{product.name}</h5>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Card.Text as="div">
            <Rating
              initialRating={product.rating}
              style={{ color: "orange" }}
              emptySymbol={<StarOutlineIcon />}
              fullSymbol={<StarIcon />}
              readonly={true}
            />
          </Card.Text>
        </Card.Text>
        <Card.Text as="h6">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Product;
