import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

import "./listUsers.css";


function ListUsers() {
  const [userRole, setUserRole] = useState(null);
  const [redirect, setRedirect] = useState(true);

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

  // Create a ref for the modal
  const [editErrorMessages, setEditErrorMessages] = useState({});
  const [deletingUser, setDeletingUser] = useState(null);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessages, setErrorMessages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    // Add form fields based on your user schema
    username: "",
    email: "",
    firstName: "",
    role: "",
    lastName: "",
    loginCount: 0,
    subscriptionType: "Free", // Default subscription type
  });
  // use effect to render the get users API to the table when loading the page
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Fetch user role
    axios
      .get("https://dashorianna-4edf3677052e.herokuapp.com/api/users/getUserRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserRole(response.data.role);
        console.log(response.data.role);
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
      });

    // Fetch user data from the API
    axios
      .get("https://dashorianna-4edf3677052e.herokuapp.com/api/users/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    // Handle redirect logic after userRole is updated
    if (userRole !== "admin") {
      console.log(userRole);
      setRedirect(true);
    }
  }, [userRole]);
  // search
  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("https://dashorianna-4edf3677052e.herokuapp.com/api/users/users")
      .then((response) => {
        setUsers(response.data);
        setSearchResults(response.data); // Initialize search results with all users
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  console.log(redirect); //false
  // Render Redirect component if redirect is false
  if (!redirect) {
    return <Navigate to="/" />;
  }
  // search code
  const handleSearch = () => {
    const filteredResults = users.filter((user) => {
      const usernameMatch =
        user.username &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch =
        user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const firstNameMatch =
        user.firstName &&
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
      const lastNameMatch =
        user.lastName &&
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      const roleMatch =
        user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const subscriptionTypeMatch =
        user.subscriptionType &&
        user.subscriptionType.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        usernameMatch ||
        emailMatch ||
        firstNameMatch ||
        lastNameMatch ||
        roleMatch ||
        subscriptionTypeMatch
      );
    });

    setSearchResults(filteredResults);
  };

  // edit functions start
  const handleEditClick = (user) => {
    setEditingUser(user);
    // Update the form data with the selected user's details
    setEditErrorMessages({});
    setFormData({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      loginCount: user.loginCount,
      subscriptionType: user.subscriptionType || "Free",
    });
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    if (validateEditForm()) {
      console.log(editingUser);
      // Check if the updated email already exists
      const emailExists = users.some(
        (user) => user.email === formData.email && user._id !== editingUser._id
      );
      const usernameExists = users.some(
        (user) =>
          user.username === formData.username && user._id !== editingUser._id
      );

      if (emailExists) {
        setEditErrorMessages({
          email: "This email already exists. Please choose a different one.",
        });
      }
      if (usernameExists) {
        setEditErrorMessages({
          username:
            "This username already exists. Please choose a different one.",
        });
      } else {
        // Continue with the update logic
        axios
          .put(
            `https://dashorianna-4edf3677052e.herokuapp.com/api/users/users/${editingUser._id}`,
            formData
          )
          .then((response) => {
            const updatedUsers = users.map((user) =>
              user._id === editingUser._id ? response.data : user
            );
            setUsers(updatedUsers);
            setEditingUser(null);
            setFormData({
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              subscriptionType: "Free",
            });
            setEditErrorMessages({}); // Clear any previous error messages
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.errors
            ) {
              setEditErrorMessages(error.response.data.errors);
            }
          });
      }
    }
  };

  const validateEditForm = () => {
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    setEditErrorMessages(errors);
    console.log(errors);

    return Object.keys(errors).length === 0;
  };
  // end edit func

  // delete code start
  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };
  const handleDeleteSubmit = (userId) => {
    // Make an API call to delete the user
    axios
      .delete(`https://dashorianna-4edf3677052e.herokuapp.com/api/users/users/${userId}`)
      .then((response) => {
        // Handle successful deletion
        console.log(response.data.message);
        // Update the local state to reflect the deletion
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  //delete code end
  // registration code start

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
            role: role,
          }
        );

        // Assuming your backend sends back tokens in the response
        const { accessToken, refreshToken } = response.data;

        // Handle successful registration response here (e.g., redirect user to a protected route)
        console.log("Registration successful:", response.data);
      } catch (error) {
        // Handle error here
        console.error("Error registering:", error);
      }
    }
  };
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
  // registration code end
  //PAGINATION CODE START
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page links
  const pageLinks = Array.from(
    { length: Math.ceil(users.length / usersPerPage) },
    (_, index) => (
      <li
        key={index + 1}
        className={currentPage === index + 1 ? "page-item active" : "page-item"}
      >
        <button className="page-link" onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      </li>
    )
  );
  // Ensure that there are always 10 rows displayed
  const emptyRowsCount = usersPerPage - currentUsers.length;
  const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => (
    <tr key={`empty-row-${index}`}>
      <td colSpan="8">
        {/* Adjust the colspan based on the number of columns in your table */}
      </td>
    </tr>
  ));
  //PAGINATION CODE ENDS
  if (isAdmin !== null && isAdmin === false) {
    return "You are not authorized to view this page. Please log in as an admin.";
  }
  if (isAdmin === null) {
    return "Loading...";
  }
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Admin Dashboard</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        <script>
          {`
            $(document).ready(function(){
              $('[data-toggle="tooltip"]').tooltip();
              var checkbox = $('table.custom-table tbody input[type="checkbox"]');
              $("#selectAll").click(function(){
                if(this.checked){
                  checkbox.each(function(){
                    this.checked = true;                        
                  });
                } else {
                  checkbox.each(function(){
                    this.checked = false;                        
                  });
                }
              });
              checkbox.click(function(){
                if(!this.checked){
                  $("#selectAll").prop("checked", false);
                }
              });
            });
          `}
        </script>
      </Helmet>
      <div className="wrapper">
        <Header />
        <div className="App">
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Users List</h1>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="http://localhost:3000/admin">
                          Admin dashboard
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Users List</li>
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

                {/* /.row */}
                {/* Main row */}
                <div className="row">
                  <div className="body custom-body">
                    <div className="container-xl">
                      <div className="table-responsive custom-table-responsive">
                        <div className="table-wrapper custom-table-wrapper">
                          <div className="table-title custom-table-title">
                            <div className="row">
                              <div className="col-sm-6">
                                <h2>
                                  Manage <b>Users</b>
                                </h2>
                                {/* Search bar */}
                                <div className="input-group mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                      onClick={handleSearch}
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <a
                                  href="#addEmployeeModal"
                                  className="btn btn-success"
                                  data-toggle="modal"
                                >
                                  <i className="material-icons"></i>{" "}
                                  <span>Add New User</span>
                                </a>
                                <a
                                  href="#deleteEmployeeModal"
                                  className="btn btn-danger"
                                  data-toggle="modal"
                                >
                                  <i className="material-icons"></i>{" "}
                                  <span>Delete</span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <table className="table custom-table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>
                                  <span className="custom-checkbox custom-custom-checkbox">
                                    <input type="checkbox" id="selectAll" />
                                    <label htmlFor="selectAll" />
                                  </span>
                                </th>
                                <th>Username</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Login count</th>
                                <th>Subscription Type</th>
                                <th>Role</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentUsers.map((user) => (
                                <tr key={user._id}>
                                  <td>
                                    <span className="custom-checkbox custom-custom-checkbox">
                                      <input
                                        type="checkbox"
                                        id={`checkbox${user._id}`}
                                        name="options[]"
                                        value={user._id}
                                      />
                                      <label htmlFor={`checkbox${user._id}`} />
                                    </span>
                                  </td>
                                  <td>{user.username}</td>
                                  <td>{user.firstName}</td>
                                  <td>{user.lastName}</td>
                                  <td>{user.email}</td>
                                  <td>{user.loginCount}</td>
                                  <td>{user.subscriptionType}</td>
                                  <td>{user.role}</td>
                                  <td>
                                    <a
                                      href="#editEmployeeModal"
                                      className="edit"
                                      data-toggle="modal"
                                      onClick={() => handleEditClick(user)}
                                    >
                                      <i
                                        className="material-icons"
                                        data-toggle="tooltip"
                                        title="Edit"
                                      >
                                        
                                      </i>
                                    </a>
                                    <a
                                      href="#deleteEmployeeModal"
                                      className="delete"
                                      data-toggle="modal"
                                      onClick={() => handleDeleteClick(user)}
                                    >
                                      <i
                                        className="material-icons"
                                        data-toggle="tooltip"
                                        title="Delete"
                                      >
                                        
                                      </i>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                              {emptyRows}
                            </tbody>
                          </table>
                          <div className="clearfix">
                            <div className="hint-text custom-hint-text">
                              Showing <b>{indexOfFirstUser + 1}</b> to{" "}
                              <b>{Math.min(indexOfLastUser, users.length)}</b>{" "}
                              of <b>{users.length}</b> entries
                            </div>
                            <ul className="pagination custom-pagination">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => paginate(currentPage - 1)}
                                >
                                  Previous
                                </button>
                              </li>
                              {pageLinks}
                              <li
                                className={`page-item ${
                                  currentPage ===
                                  Math.ceil(users.length / usersPerPage)
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => paginate(currentPage + 1)}
                                >
                                  Next
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* add Modal HTML */}
                    <div
                      id="addEmployeeModal"
                      className="modal custom-modal fade"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <form>
                            <div className="modal-header">
                              <h4 className="modal-title">Add Employee</h4>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                              >
                                ×
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                                {errorMessages.username && (
                                  <p className="error">
                                    {errorMessages.username}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  required
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {errorMessages.email && (
                                  <p className="error">{errorMessages.email}</p>
                                )}
                              </div>

                              <div className="form-group">
                                <label>Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  required
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                {errorMessages.password && (
                                  <p className="error">
                                    {errorMessages.password}
                                  </p>
                                )}
                              </div>

                              <div className="form-group">
                                <label>Role Type</label>
                                <select
                                  className="form-control"
                                  onChange={(e) => setRole(e.target.value)}
                                  value={role}
                                >
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <input
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                defaultValue="Cancel"
                              />
                              <input
                                type="submit"
                                className="btn btn-success"
                                defaultValue="Add"
                                onClick={handleRegister}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Edit Modal HTML */}
                    <div
                      id="editEmployeeModal"
                      className="modal custom-modal fade"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <form onSubmit={handleEditFormSubmit}>
                            <div className="modal-body">
                              {/* Add form fields based on your user schema */}
                              <div className="form-group">
                                <label>Username</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.username}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      username: e.target.value,
                                    })
                                  }
                                  required
                                />
                                <div className="error-message">
                                  {editErrorMessages.username && (
                                    <p className="error">
                                      {editErrorMessages.username}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  required
                                />
                                {editErrorMessages.email && (
                                  <p className="error">
                                    {editErrorMessages.email}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.firstName}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      firstName: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.lastName}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      lastName: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label>Subscription Type</label>
                                <select
                                  className="form-control"
                                  value={formData.subscriptionType}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      subscriptionType: e.target.value,
                                    })
                                  }
                                >
                                  <option value="Free">Free</option>
                                  <option value="Basic">Basic</option>
                                  <option value="Premium">Premium</option>
                                </select>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <input
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                defaultValue="Cancel"
                              />
                              <input
                                type="submit"
                                className="btn btn-info"
                                defaultValue="Save"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Delete Modal HTML */}
                    <div
                      id="deleteEmployeeModal"
                      className="modal custom-modal fade"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Delete Employee</h4>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-hidden="true"
                            >
                              ×
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>
                              Are you sure you want to delete these Records?
                            </p>
                            <p className="text-warning">
                              <small>This action cannot be undone.</small>
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-default"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              data-dismiss="modal"
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteSubmit(deletingUser._id);
                                // Close the modal after deletion if needed
                              }}
                            >
                              Delete
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.row (main row) */}
              </div>
              {/* /.container-fluid */}
            </section>
            {/* /.content */}
          </div>
        </div>
        <SideNav />

        <Footer />
      </div>
    </>
  );
}

export default ListUsers;
