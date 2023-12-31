import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

import jwtDecode from "jwt-decode";

import Axios from "axios";

const Profile = () => {
  const [utilisateurs, setUtilisateurs] = useState(null); // Store the fetched employee data

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    nom: "",
    prenom: "",
    email: "",
  });

  useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
  
    try {
      const decodedToken = jwtDecode(userToken);
      const userRoles = decodedToken?.roles || [];
  
      if (userRoles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR')) {
        fetchUtilisateurs(); // Fetch vacations if the user has the required role
      } else {
        console.log("User role does not match the required roles.");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  const fetchUtilisateurs = () => {
    const userToken = localStorage.getItem("jwtToken");
    const utilisateurId = localStorage.getItem("userId");
  
    Axios.get(`http://localhost:8080/utilisateurs/${utilisateurId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      console.log("Utilisateur data:", response.data);
      setUtilisateurs(response.data);
    })
    .catch((error) => {
      console.error("Error fetching Utilisateur:", error);
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

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setShowEditModal(true);
    setFormData({ ...profile });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Get the user token from localStorage
    const userToken = localStorage.getItem("jwtToken");
    
    // Decode the user token to get roles    
    console.log("Form Data:", formData);

    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    };
  
    try {
      // Send the PUT request with the updated data and Authorization header
      await Axios.put(`http://localhost:8080/utilisateurs/${formData.id}`, formData, config);
      setShowEditModal(false); // Close the edit modal
  
      // Fetch updated vacations list with proper authorization
        Axios.get("http://localhost:8080/utilisateurs", config)
        .then((response) => {
          setUtilisateurs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching utilisateur:", error);
        });
    } catch (error) {
      console.error("Error updating utilisateur:", error);
    }
  };
  
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <Navbar />
        
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profil</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Tableau de bord</a></li>
                  <li className="breadcrumb-item active">Profil</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="card mb-0">
            <div className="card-body">
            {utilisateurs && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-view">
                      <div className="profile-basic">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="profile-info-left">
                              <h3 className="user-name m-t-0 mb-0">{utilisateurs.nom} {utilisateurs.prenom}</h3>
                              <div className="staff-id">Utilisateur ID : {utilisateurs.id}</div>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <ul className="personal-info">
                              <li>
                                <div className="title">E-mail:</div>
                                <div className="text">{utilisateurs.email}</div>
                              </li>
                              <li>
                                <div className="title">Username:</div>
                                <div className="text">{utilisateurs.username}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pro-edit"><a data-target="#profile_info" data-toggle="modal" className="edit-icon" href="?" onClick={() => handleEditProfile(utilisateurs)}><i className="fa fa-pencil" /></a></div>
                    </div> 
                  </div>
                </div>
            )}
            </div>
          </div>
        </div>
        {/* /Page Content */}

        {/* Profile Modal */}
        {selectedProfile && showEditModal && (
        <div id="profile_info" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Informations sur le profil</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateProfile}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="profile-img-wrap edit-img">
                        <img className="inline-block" src="assets/img/profiles/avatar-02.jpg" alt="user" />
                        <div className="fileupload btn">
                          <span className="btn-text">Modifier</span>
                          <input className="upload" type="file" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" className="form-control" name="nom" value={formData.nom} onChange={handleInputChange}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nom de famille</label>
                            <input type="text" className="form-control" name="prenom" value={formData.prenom} onChange={handleInputChange}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>username</label>
                            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleInputChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" type="submit">Soumettre</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        )}
        {/* /Profile Modal */}

      </div>
    </div>
  );
};

export default Profile;
