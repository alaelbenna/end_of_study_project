import React, { useState, useEffect } from "react";
import facebook from "../img/facebook-icon.png";
import instagram from "../img/instagram-icon.png";
import tiktok from "../img/tiktok-icon.png";
import twitter from "../img/twitter-logo-2.png";

import "./dashboard.css";
function Footer() {
  return (
    <div className="social-links">
      <div className="social-links">
        <a
          href="https://instagram.com/orion_ia?igshid=MzRlODBiNWFlZA=="
          target="_blank"
        >
          <img src={instagram} alt="Instagram" />
        </a>
        <a href="https://www.tiktok.com/@orion_ai?lang=en" target="_blank">
          <img src={tiktok} alt="Tiktok" />
        </a>
        <a href="https://www.twitter.com/" target="_blank">
          <img src={twitter} alt="Twitter" />
        </a>
        <span>Orion © Tous droits réservés</span>
      </div>
    </div>
  );
}

export default Footer;
