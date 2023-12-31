import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Axios from "axios";
import jwtDecode from "jwt-decode";
import 'popper.js';


const Categorie = () => {
  const [categories, setCategories] = useState([]);

  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
  });

  useEffect(() => {

    const userToken = localStorage.getItem("jwtToken");

    try {
      const decodedToken = jwtDecode(userToken);
      const userRoles = decodedToken?.roles || [];
  
      if (userRoles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR')) {
        fetchCategories(); // Fetch vacations if the user has the required role
      } else {
        console.log("User role does not match the required roles.");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  const fetchCategories = () => {
    const userToken = localStorage.getItem('jwtToken');

    Axios.get("http://localhost:8080/categories", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      console.log("Categories data:", response.data);
      setCategories(response.data);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      // For other input fields, update the formData as usual
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userToken = localStorage.getItem("jwtToken");
    console.log("User Token:", userToken);
  
    const decodedToken = jwtDecode(userToken);
    console.log("Decoded Token:", decodedToken);
  
    const userRoles = decodedToken?.roles || [];
    console.log("User Roles:", userRoles);

    console.log("Form Data:", formData);

    if (userRoles.some((role) => role.authority === "ROLE_ADMIN" || role.authority === 'ROLE_AUTHOR')) {
      console.log("User has the required role. Sending POST request...");
  
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`, // Set the Authorization header
        },
      };

    // Send a POST request to create the new employee
    Axios.post("http://localhost:8080/categories", formData, config)
      .then((response) => {
        // Employee created successfully, do something (e.g., show a success message, update the employee list, etc.)
        console.log("categorie created:", response.data);

        // Clear the form after submission
        setFormData({
            title: "",
        });
        setShowAddModal(false);
        fetchCategories();
      })
      .catch((error) => {
        // Error occurred while creating the employee, handle the error (e.g., show an error message)
        console.error("Error creating categorie:", error);
      });
    }
  };

  const handleEditCategorie = (categorie) => {
    setSelectedCategorie(categorie);
    setShowEditModal(true);
    setFormData({ ...categorie});
  };

  const handleUpdateCategorie = async (e) => {
    e.preventDefault();
    // Get the user token from localStorage
    const userToken = localStorage.getItem("jwtToken");
    
    // Decode the user token to get roles
    const decodedToken = jwtDecode(userToken);
    const userRoles = decodedToken?.roles || [];

    console.log("Form Data:", formData);
      
    // Check if the user has the required role
    const hasRequiredRole = userRoles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR');
    
    if (!hasRequiredRole) {
      console.log("User does not have the required role to update categorie.");
      return;
    }
  
    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    };


    try {
      await Axios.put(`http://localhost:8080/categories/${formData.id_categorie}`, formData, config);
      
      setShowEditModal(false);
      // You can update the employee list if needed by refetching data
      Axios
        .get("http://localhost:8080/categories", config)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    } catch (error) {
      console.error("Error updating categorie:", error);
    }
  };

  const handleDeleteCategorie = () => {
    if (selectedCategorie) {
           // Get the user token from localStorage
      const userToken = localStorage.getItem("jwtToken");
      
      // Decode the user token to get roles
      const decodedToken = jwtDecode(userToken);
      const userRoles = decodedToken?.roles || [];
  
      // Check if the user has the required role
      const hasRequiredRole = userRoles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR');
      
      if (!hasRequiredRole) {
        console.log("User does not have the required role to delete categorie.");
        return;
      }
  
      // Set the Authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      };

      // Send a DELETE request to delete the selected employee
      Axios.delete(`http://localhost:8080/categories/${selectedCategorie.id_categorie}`, config)
        .then((response) => {
          // Employee deleted successfully, do something (e.g., show a success message, update the employee list, etc.)
          console.log("Categorie deleted:", selectedCategorie);
  
          // Clear the selected employee
          setSelectedCategorie(null);
  
          // Close the modal after deletion
          setShowDeleteModal(false);
                    // Fetch the updated vacations list after deletion
          Axios.get("http://localhost:8080/categories")
            .then((response) => {
              setCategories(response.data);
            })
            .catch((error) => {
              console.error("Error fetching categories:", error);
            }); 
        })
        .catch((error) => {
          // Error occurred while deleting the employee, handle the error (e.g., show an error message)
          console.error("Error deleting Categorie:", error);
  
          // Clear the selected employee
          setSelectedCategorie(null);
  
          // Close the modal after deletion
          setShowDeleteModal(false);
        });
    }
  };
  
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <Navbar />
        
          <div className="content container-fluid">
            {/* Page Content goes here */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Catégorie</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/Maininex">Tableau de bord</Link> {/* Use Link instead of <a> */}
                    </li>
                    <li className="breadcrumb-item active">Catégorie</li>
                  </ul>
                </div>
                <div className="col-auto float-right ml-auto">
                  <Link to="#" className="btn add-btn" data-toggle="modal" data-target="#add_categorie">
                    {/* Use Link instead of <a> */}
                    <i className="fa fa-plus"></i> Ajouter une catégorie
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div>
                {categories.length > 0 ? (
                  <table className="table table-striped custom-table mb-0 datatable">
                    <thead>
                      <tr>
                        <th style={{ width: "30px" }}>#</th>
                        <th>Titre du catégorie</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Categorie table rows go here */}
                      {categories.map((categorie) => (
                      <tr key={categorie.id_categorie}>
											<td>{categorie.id_categorie}</td>
											<td>{categorie.title}</td>
											<td className="text-right">
                        <div className="dropdown dropdown-action">
                            <a href="?" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="?" data-toggle="modal" data-target="#edit_categorie" onClick={() => handleEditCategorie(categorie)}><i className="fa fa-pencil m-r-5"></i> Modifier</a>
                                <a className="dropdown-item" href="?" data-toggle="modal" data-target="#delete_categorie" onClick={() => {setSelectedCategorie(categorie); setShowDeleteModal(true);}}><i className="fa fa-trash-o m-r-5"></i> Supprimer</a>
                            </div>
												</div>
											</td>
										</tr>
                    ))}
                    </tbody>
                  </table>
                  ):(<p>No data available in table</p>)}
                </div>
              </div>
            </div>
          </div>

          {/* Add categorie Modal */}
          <div id="add_categorie" className={`modal custom-modal fade ${showAddModal ? 'show' : ''}`} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter une catégorie</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Titre du catégorie <span className="text-danger">*</span></label>
                      <input className="form-control" type="text" name="title" value={formData.title} onChange={handleInputChange}/>
                    </div>
                    <div className="submit-section">
                      <button href="/categorie" className="btn btn-primary submit-btn">Soumettre</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          {/* /Add Categorie Modal */}

          {/* Edit Categorie Modal */}
          {selectedCategorie && showEditModal && (
          <div id="edit_categorie" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier la catégorie</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateCategorie}>
                    <div className="form-group">
                      <label>Titre du catégorie<span className="text-danger">*</span></label>
                      <input className="form-control"  type="text" name="title" value={formData.title} onChange={handleInputChange}/>
                    </div>
                    <div className="submit-section">
                      <button href="/categorie" className="btn btn-primary submit-btn">Sauvegarder</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
           )}
          {/* /Edit categorie Modal */}

          {/* Delete categorie Modal */}
          <div className={`modal custom-modal fade ${showDeleteModal ? "show" : ""}`} id="delete_categorie" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Supprimer une catégorie</h3>
                    <p>Etes-vous sûr de vouloir supprimer ?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                      <a href="/categorie" className="btn btn-primary continue-btn" onClick={handleDeleteCategorie} >Supprimer</a>
                      </div>
                      <div className="col-6">
                      <a href="/categorie" data-dismiss="modal" className="btn btn-primary cancel-btn" onClick={() => setShowDeleteModal(false)}>Annuler</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Delete Categorie Modal */}
        
      </div>
    </div>
  );
};

export default Categorie;
