import React, { useState, useEffect } from "react";
import "./profile.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function Profile() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionType: "",
    subscriptionDate: "", // Assuming this property is present in your userDetails
  });

  // Initialize userId state with the initial value from local storage
  const [userId, setUserId] = useState(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    return storedUserDetails ? storedUserDetails._id : null;
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://dashorianna-4edf3677052e.herokuapp.com/api/users/users/${userId}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Add userId as a dependency to re-fetch details when it changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);

    try {
      const response = await axios.put(
        `https://dashorianna-4edf3677052e.herokuapp.com/api/users/userss/${userId}`,
        userDetails
      );

      localStorage.setItem("userDetails", JSON.stringify(response.data));
      setUserDetails(response.data);

      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="containerrr">
        <h1>My Profile</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Last Name :</label>
          <input
            type="text"
            id="nom"
            name="lastName"
            value={userDetails.lastName}
            className="form-control"
            onChange={handleInputChange}
          />
          <label htmlFor="prenom">Name :</label>
          <input
            type="text"
            id="prenom"
            name="firstName"
            value={userDetails.firstName}
            className="form-control"
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            className="form-control"
            onChange={handleInputChange}
          />
          <label htmlFor="abonnement">Subscription Type :</label>
          <input
            type="text"
            id="abonnement"
            name="subscriptionType"
            value={userDetails.subscriptionType}
            className="form-control"
            readOnly
          />
          <label htmlFor="date-abonnement">Subscription Date :</label>
          <input
            type="text"
            id="date-abonnement"
            name="subscriptionDate"
            value={userDetails.subscriptionDate}
            className="form-control"
            readOnly
          />
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Apply changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
