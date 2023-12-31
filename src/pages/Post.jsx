import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

import jwtDecode from "jwt-decode";

import Axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    createDate: "",
    categorie : "",
    image: "", // Updated to be a string
  });

  

  useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");

    try {
        const decodedToken = jwtDecode(userToken);
        const userRoles = decodedToken?.roles || [];

        if (userRoles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR')) {
            fetchPosts(); // Fetch posts if the user has the required role
        } else {
            console.log("User role does not match the required roles.");
        }
    } catch (error) {
        console.error("Error decoding token:", error);
    }
}, []);

const fetchPosts = () => {
  const userToken = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(userToken);

  Axios.get(`http://localhost:8080/posts/utilisateur/${decodedToken.id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => {
      console.log('Posts data:', response.data);
      setPosts(response.data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });

  Axios.get('http://localhost:8080/categories', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => {
      console.log('Categories data:', response.data);
      setCategories(response.data);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "categorie") {
      const selectedObject = e.target.options[e.target.selectedIndex].value;

      setFormData({
        ...formData,
        [name]: JSON.parse(selectedObject),
    });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
     
      // Include userId in formData
      const updatedFormData = {
        ...formData,
        utilisateur: {
          id: decodedToken.id,
        },
      };
      
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`, // Set the Authorization header
        },
      };
    // Include userId in formData


    // Send a POST request to create the new employee
    Axios.post("http://localhost:8080/posts", updatedFormData, config)
      .then((response) => {
        // Employee created successfully, do something (e.g., show a success message, update the employee list, etc.)
        console.log("Post created:", response.data);

        // Clear the form after submission
        setFormData({
            title: "",
            body: "",
            createDate: "",
            categorie : "",
            image: "",
        });
        setShowAddModal(false);
        fetchPosts();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  } else {
    console.log("User does not have required role to add post.");
    // Handle the case where the user doesn't have the required role
  }
};

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
    setFormData({ ...post });
  };

  const handleUpdatePost = async (e) => {
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
      console.log("User does not have the required role to update post.");
      return;
    }
  
    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    };


    try {
      await Axios.put(`http://localhost:8080/posts/${formData.id}`, formData, config);
      setShowEditModal(false);
      // You can update the employee list if needed by refetching data
      fetchPosts();

    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = () => {
    if (selectedPost) {
           // Get the user token from localStorage
      const userToken = localStorage.getItem("jwtToken");
      
      // Decode the user token to get roles
      const decodedToken = jwtDecode(userToken);
      const userRoles = decodedToken?.roles || [];
  
      // Check if the user has the required role
      const hasRequiredRole = userRoles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR');
      
      if (!hasRequiredRole) {
        console.log("User does not have the required role to delete post.");
        return;
      }
  
      // Set the Authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      };

      // Send a DELETE request to delete the selected employee
      Axios.delete(`http://localhost:8080/posts/${selectedPost.id}`, config)
        .then((response) => {
          // Employee deleted successfully, do something (e.g., show a success message, update the employee list, etc.)
          console.log("Post deleted:", selectedPost);
  
          // Clear the selected employee
          setSelectedPost(null);
  
          // Close the modal after deletion
          setShowDeleteModal(false);
          // Fetch the updated vacations list after deletion
          Axios.get('http://localhost:8080/posts', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
            .then((response) => {
              const postWithPostRole = response.data.filter(
                (post) =>
                  post.roles.some((role) => role.name === 'ROLE_POST')
              );
              console.log('Post with POST role:', postWithPostRole);
              setPosts(postWithPostRole);
            })
            .catch((error) => {
              console.error('Error fetching POST:', error);
            });        
        })
        .catch((error) => {
          // Error occurred while deleting the employee, handle the error (e.g., show an error message)
          console.error("Error deleting POST:", error);
  
          // Clear the selected employee
          setSelectedPost(null);
  
          // Close the modal after deletion
          setShowDeleteModal(false);
        });
    }
  };

  const truncateBody = (body, maxLength) => {
    if (body.length <= maxLength) {
      return body;
    }
    // If the body is longer than maxLength, truncate and append "..."
    return body.substring(0, maxLength) + '...';
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
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Post</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/Mainindex">Tableau de bord</a></li>
                  <li className="breadcrumb-item active">Post</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <button className="btn add-btn" data-toggle="modal" data-target="#add_post"><i className="fa fa-plus" /> Ajouter un post</button>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
              {posts.length > 0 ? (
                <table className="table table-striped custom-table datatable">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Body</th>
                      <th className="text-nowrap">createDate</th>
                      <th className="text-right no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{truncateBody(post.body, 20)}</td> {/* Adjust the maxLength as needed */}
                        <td>{post.createDate}</td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a href="?" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <i className="material-icons">more_vert</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="?" data-toggle="modal" data-target="#edit_post" onClick={() => handleEditPost(post)}>
                                <i className="fa fa-pencil m-r-5" /> Modifier
                              </a>
                              <a className="dropdown-item" href="?" data-toggle="modal" data-target="#delete_post" onClick={() => {setSelectedPost(post); setShowDeleteModal(true);}}>
                                <i className="fa fa-trash-o m-r-5" /> Supprimer
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ):(<p>Aucune donnée disponible</p>)}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Employee Modal */}
        <div className={`modal custom-modal fade ${showAddModal ? 'show' : ''}`} id="add_post" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">title<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="title" value={formData.title} onChange={handleInputChange}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">createDate</label>
                        <div className="">
                          <input className="form-control" type="date" name="createDate" value={formData.createDate} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Categorie <span className="text-danger">*</span></label>
                        <select className="form-control" name="categorie" value={JSON.stringify(formData.categorie)} onChange={handleInputChange}>
                            <option value="">Sélectionnez categorie</option>
                            {categories.map((categorie) => (
                                <option key={categorie.id_categorie} value={JSON.stringify(categorie)}>
                                  {categorie.title}
                                </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">imageUrl<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">body</label>
                        <textarea className="form-control" type="text" name="body" rows="20" value={formData.body}  onChange={handleInputChange} />
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
        {/* /Add Employee Modal */}
        {/* Edit Employee Modal */}
        {selectedPost && showEditModal && (
        <div id="edit_post" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier un post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdatePost}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">title<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="title" value={formData.title} onChange={handleInputChange}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">createDate</label>
                        <div className="">
                          <input className="form-control" type="date" name="createDate" value={formData.createDate} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Categorie <span className="text-danger">*</span></label>
                        <select className="form-control" name="categorie" value={JSON.stringify(formData.categorie)} onChange={handleInputChange}>
                            <option value="">Sélectionnez categorie</option>
                            {categories.map((categorie) => (
                                <option key={categorie.id_categorie} value={JSON.stringify(categorie)}>
                                  {categorie.title}
                                </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">imageUrl<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">body</label>
                        <textarea className="form-control" type="text" name="body" rows="20" value={formData.body}  onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Soumettre</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        )}        
        {/* /Edit Employee Modal */}
        {/* Delete Employee Modal */}
        <div className={`modal custom-modal fade ${showDeleteModal ? "show" : ""}`} id="delete_post" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Supprimer un post</h3>
                  <p>Etes-vous sûr de vouloir supprimer ?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="?" className="btn btn-primary continue-btn" onClick={handleDeletePost}>Supprimer</a>
                    </div>
                    <div className="col-6">
                      <a href="?" data-dismiss="modal" className="btn btn-primary cancel-btn"  onClick={() => setShowDeleteModal(false)}>Annuler</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Employee Modal */}
        
      </div>
    </div>
  );
};

export default Post;



