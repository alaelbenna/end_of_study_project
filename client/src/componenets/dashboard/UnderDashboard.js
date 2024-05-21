import React, { useState } from "react";

import moderne from "../img/moderne.jfif";
import minimalist from "../img/minimalist.jpeg";
import scandinave from "../img/scandinave.jpeg";
import tropical from "../img/tropical.jpeg";
import japonaise from "../img/japonaise.jpeg";
import francais from "../img/francais.jpeg";
import noel from "../img/noel.jpeg";
import halloween from "../img/halloween.jpeg";
import "./dashboard.css";

function UnderDashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardName) => {
    // Update the selected card state when a card is clicked
    setSelectedCard(cardName);
  };

  return (
    <div className="joujou">
      {/* Section*/}

      <section className="py-5">
        <div className="jiji">
          <h1 id="color-type-span">Choose your category</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
            <div className="col mb-2">
              <div
                className={`card h-100 ${
                  selectedCard === "halloween" ? "selected" : ""
                }`}
                onClick={() => handleCardClick("halloween")}
              >
                {/* Product image*/}
                <img className="card-img-top" src={halloween} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">halloween</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>
            </div>
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={noel} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Noël</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>
            </div>
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={scandinave} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Scandinave</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>
            </div>
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={francais} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Français</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>
            </div>{" "}
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={minimalist} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Minimaliste</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>{" "}
            </div>{" "}
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={tropical} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Tropicale</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>{" "}
            </div>{" "}
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={moderne} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Moderne</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>
            </div>
            <div className="col mb-2">
              <div className="card h-100">
                {/* Product image*/}
                <img className="card-img-top" src={japonaise} alt="..." />
                {/* Product details*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name*/}
                    <h5 className="fw-bolder">Japonnais</h5>
                    {/* Product price*/}
                  </div>
                </div>
                {/* Product actions*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UnderDashboard;
