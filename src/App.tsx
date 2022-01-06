import React from "react";
import "./App.css";
import shopifyLogo from "./assets/shopify-logo.png";

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
          Photo list
        </div>
      </div>
    </div>
  );
}

export default App;
