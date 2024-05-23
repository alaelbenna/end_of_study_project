import React from "react";

function ForgotPassword() {
  return (
    <div>
      <img
        id="logo"
        src="https://orion-horizons.com/LOGO ORION .png"
        alt="Logo"
        className="text-center"
      />
      <div className="container" id="from-connexion">
        <div className="row">
          <div className="col-md-4 mx-auto form-style">
            <div className="card">
              {"{"}% if message %{"}"}
              <div className="alert alert-success" role="alert">
                {"{"}
                {"{"} message {"}"}
                {"}"}
              </div>
              {"{"}% endif %{"}"}
              <div className="card-header">
                <h3 className="text-center title">
                  Changement de mot de passe
                </h3>
              </div>
              <div className="card-body">
                <form method="post" action="/change-password">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Nouveau mot de passe :
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirmation du nouveau mot de passe :
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                  <button
                    id="btn-connexion"
                    type="submit"
                    className="btn btn-primary d-block mx-auto"
                  >
                    Valider
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="social-links">
        <div className="social-links">
          <a href="https://www.facebook.com/orionaifr/" target="_blank">
            <img
              src="https://orion-horizons.com/facebook-icon.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://instagram.com/orion_ia?igshid=MzRlODBiNWFlZA=="
            target="_blank"
          >
            <img
              src="https://orion-horizons.com/instagram-icon.png"
              alt="Instagram"
            />
          </a>
          <a href="https://www.tiktok.com/@orion_ai?lang=en" target="_blank">
            <img
              src="https://orion-horizons.com/tiktok-icon.png"
              alt="Tiktok"
            />
          </a>
          <a href="https://www.twitter.com/" target="_blank">
            <img
              src="https://orion-horizons.com/twitter-logo.png"
              alt="Twitter"
            />
          </a>
          <span>Orion © Tous droits réservés</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
