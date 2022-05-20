import React, { useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterProducts } from "../redux/actions/productAction";
import Loader from "./Loader";
const Filter = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState("all");
  const filterHandler = () => {
    setLoading(true);
    dispatch(filterProducts(search, sort, category));
    setLoading(false);
  };
  return (
    <Container>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <input
            value={search}
            style={{ margin: "5px 0" }}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search products"
            className="form-control"
          />
        </Col>
        <Col>
          <select
            style={{ margin: "5px" }}
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="htl">High To Low</option>
            <option value="lth">Low To High</option>
          </select>
        </Col>
        <Col>
          <select
            style={{ margin: "5px" }}
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="mobiles">Mobiles</option>
            <option value="games">Games</option>
          </select>
        </Col>
        <Col>
          <button
            className="btn-btn"
            onClick={filterHandler}
            type="search"
            style={{ margin: "5px", width: "306px" }}
          >
            {loading ? <Loader /> : "search"}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default Filter;
