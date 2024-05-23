import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

function Home() {
  const [registrationCount, setRegistrationCount] = useState("Loading...");
  const [isAdmin, setisAdmin] = useState(null);
  useEffect(() => {
    // Use Axios to make the HTTP request
    axios
      .get("https://dashorianna-4edf3677052e.herokuapp.com/api/users/isAdmin")
      .then((response) => {
        // Update the registration count in the state
        setisAdmin(true);
      })
      .catch((error) => {
        console.error("Error fetching registration count:", error);
        setisAdmin(false);
      });
  }, []);

  useEffect(() => {
    // Use Axios to make the HTTP request
    axios
      .get("https://dashorianna-4edf3677052e.herokuapp.com/api/users/registrations/count")
      .then((response) => {
        // Update the registration count in the state
        setRegistrationCount(response.data.totalRegistrations);
      })
      .catch((error) => {
        console.error("Error fetching registration count:", error);
        setRegistrationCount("Error");
      });
  }, []);
  if (isAdmin !== null && isAdmin == false) {
    return "You are not authorized to view this page. Please log in as an admin.";
  }
  if (isAdmin === null) {
    return "Loading...";
  }
  return (
    <div className="App">
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Admin Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="http://localhost:3000/">Go back to site</a>
                  </li>
                  <li className="breadcrumb-item active">Admin Dashboard</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Orders</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      53<sup style={{ fontSize: 20 }}>%</sup>
                    </h3>
                    <p>Bounce Rate</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{registrationCount}</h3>
                    <p>User Registrations</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add"></i>
                  </div>
                  <a
                    href="http://localhost:3000/listUsers"
                    className="small-box-footer"
                  >
                    Consult registred Users{" "}
                    <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Unique Visitors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row"></div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}

export default Home;
