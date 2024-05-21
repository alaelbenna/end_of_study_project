import React, { useState, useEffect } from "react";
import salledeBain from "../img/salle_de_bains.jpeg";
import cuisine from "../img/cuisine.jpeg";
import Navbar from "../Navbar/Navbar";
import livingroom from "../img/living-room.jpeg";
import chambre from "../img/chambre.jpeg";
import salleamanger from "../img/salle_a_manger.jpeg";
import bureau from "../img/bureau.jpeg";
import exterieur from "../img/exterieur.jpeg";
import toilette from "../img/toilette.jpeg";
import dressing from "../img/dressing.webp";
import { Link } from "react-router-dom";

import Footer from "./Footer";

function Dashboard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    setIsAuthenticated(!!(accessToken && refreshToken));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      readImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="joujou">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5">
      <img src={logo}  className="logo" />

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">ATELIER</a></li>
          <li className="nav-item"><a className="nav-link" href="/profile">PROFIL</a></li>
          <li className="nav-item"><a className="nav-link" href="/support">SUPPORT</a></li>
        </ul>
        {isAuthenticated ? (
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
        )}

      </div>
    </div>
  </nav>  */}
      <Navbar />

      {/* Header*/}
      <header className=" py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center ">
            <h1 className="display-4 fw-bolder">
              Sublime interior, in one click
            </h1>
          </div>
        </div>
      </header>

      <br />
      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
            <div className="col mb-2">
              <Link to="/sdb" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={salledeBain} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="joujouet">Salle de Bain</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="/cuisine" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={cuisine} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Cuisine</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>

            <div className="col mb-2">
              <Link to="/toilette" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={toilette} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Toilette</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>

            <div className="col mb-2">
              <Link to="/salon" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={livingroom} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Salon</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="/Extérieur" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={exterieur} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Extérieur Maison</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="/Chambre" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={chambre} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Chambre</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>

            <div className="col mb-2">
              <Link to="/Bureau" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={bureau} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Bureau à domicile</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="/Salleàmanger" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={salleamanger} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Salle à manger</h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="/dressing" className="joujouet">
                <div className="card h-100">
                  {/* Product image*/}
                  <img className="card-img-top" src={dressing} alt="..." />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">Dressing </h5>
                      {/* Product price*/}
                    </div>
                  </div>
                  {/* Product actions*/}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Dashboard;
