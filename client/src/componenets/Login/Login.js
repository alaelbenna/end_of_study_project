import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  const validateRegistration = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };
  const validateLogin = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const toggleForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://dashorianna-4edf3677052e.herokuapp.com/api/users/login",
        {
          username: username,
          password: password,
        }
      );

      // Assuming your backend sends back tokens and user details in the response
      const { accessToken, refreshToken, user } = response.data;

      // Store the tokens securely (e.g., in localStorage or secure cookies)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Store the user details in localStorage or state for later use
      localStorage.setItem("userDetails", JSON.stringify(user));

      // Handle successful login response here (e.g., redirect user to a protected route)
      console.log("Login successful:", response.data);
      navigate("/");
    } catch (error) {
      // Handle error here
      console.error("Error logging in:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Clear the specific error message when the user starts typing
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
    // Update the state
    if (name === "logemail") setUserName(value);
    else if (name === "logpass") setPassword(value);
    else if (name === "logname") setUserName(value);
    else if (name === "logemail") setEmail(value);
  };

  const handleRegister = async () => {
    if (validateRegistration()) {
      try {
        const response = await axios.post(
          "https://dashorianna-4edf3677052e.herokuapp.com/api/users/register",
          {
            // Replace with actual user input or dynamic data
            username: username,
            email: email,
            password: password,
          }
        );

        // Assuming your backend sends back tokens in the response
        const { accessToken, refreshToken } = response.data;

        // Store the tokens securely (e.g., in localStorage or secure cookies)
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Handle successful registration response here (e.g., redirect user to a protected route)
        console.log("Registration successful:", response.data);
      } catch (error) {
        // Handle error here
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="containerr login-page">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logemail"
                            className="form-style"
                            placeholder="Your username"
                            id="logemail1"
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass1"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#" className="btn mt-4" onClick={handleLogin}>
                          submit
                        </a>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Your Full Name"
                            id="logname"
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <i className="input-icon uil uil-user"></i>
                          {errorMessages.username && (
                            <p className="error">{errorMessages.username}</p>
                          )}
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <i className="input-icon uil uil-at"></i>
                          {errorMessages.email && (
                            <p className="error">{errorMessages.email}</p>
                          )}
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                          {errorMessages.password && (
                            <p className="error">{errorMessages.password}</p>
                          )}
                        </div>
                        <a
                          href="#"
                          className="btn mt-4"
                          onClick={handleRegister}
                        >
                          submit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
