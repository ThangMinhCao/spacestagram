import React from "react";
import "./App.css";
import shopifyLogo from "./assets/shopify-logo.png";
import Card from "./components/Card/Card";

function App() {
  return (
    <div>
      <div className="header">
        <img className="logo" src={shopifyLogo} alt="Shopify Logo" />
        Spacestagram
      </div>
      <div className="main-container">
        <div className="welcome">
          Welcome to Spacestagram - The most wonderful photo library of NASA.
        </div>
        <div className="photo-list">
          <Card
            imgURL="https://cdn.mos.cms.futurecdn.net/M7fDTpDnJcZ4dt3myngzxi.jpg"
            date="2021-07-20"
            description="This is a space image about black hole"
            title="Black hole"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
