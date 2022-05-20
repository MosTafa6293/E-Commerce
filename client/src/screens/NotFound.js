import React from "react";
import img from "../styles/404.jpg";
const NotFound = () => {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div
        className=""
        style={{
          textAlign: "center",
          padding: "1rem",
          color: "var(--black2-color)",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        <h1>404</h1>
        <p>PAGE NOT FOUND</p>
        <img src="https://blog.hubspot.com/hs-fs/hubfs/404-error-page-iconfinder.jpg?width=650&name=404-error-page-iconfinder.jpg" />
      </div>
    </div>
  );
};

export default NotFound;
