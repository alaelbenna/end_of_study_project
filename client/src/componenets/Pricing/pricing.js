import React from "react";
import "./pricing.css";
function pricing() {
  return (
    <div>
      <div className="title-dashboard">Abonnements</div>
      <div className="plan-wrapper">
        <div
          className="plan"
          style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)" }}
        >
          <h2>Plan Découverte</h2>
          <p className="price">9.99 € - 40 crédits</p>
          <a href="https://buy.stripe.com/eVa8zm1ilgwy6U87su">
            <button className="button">Payer maintenant</button>
          </a>
        </div>
        <div
          className="plan"
          id="popular"
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 2.5)" }}
        >
          <h2>Plan Explorateur</h2>
          <p className="price">19.99 € - 100 crédits</p>
          <a href="https://buy.stripe.com/3csbLy2mpa8a4M03cf">
            <button className="button">Payer maintenant</button>
          </a>
        </div>
        <div
          className="plan"
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
        >
          <h2>Plan Pro</h2>
          <p className="price">49.99 € - 300 crédits</p>
          <a href="https://buy.stripe.com/fZe8zm6CF1BE92g28c">
            <button className="button">Payer maintenant</button>
          </a>
          <ul>
            <li>Sauvegarder vos images</li>
            <li>Support premium </li>
            <li>Abilité de demander des features</li>
            <li>Usage commercial des photos</li>
            <li>Test des versions Bêta</li>
          </ul>
        </div>
      </div>
      &gt;
    </div>
  );
}

export default pricing;
