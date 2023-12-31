import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
        username: username,
        email: email,
        password: password,
      });

      // Handle the signup success as needed (e.g., show a success message)
      console.log("Signup successful:", response.data);

      // Assuming successful signup redirects to login
      navigate("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="main-wrapper">
      <br />
      <div className="account-content">
        <div className="container">
          <div className="account-logo">
            {/* Logo component or image goes here */}
          </div>
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">S'inscrire</h3>
              <p className="account-subtitle">Content de te revoire!!</p>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label>Nom d'utilisateur</label>
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Mot de passe</label>
                    </div>
                    <div className="col-auto">
                      <a className="text-muted" href="forgot-password.html">
                        Mot de passe oublié?
                      </a>
                    </div>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-danger">{error}</div>}
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">
                    S'inscrire
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Vous avez déjà un compte? <Link to="/login">Connectez-vous ici</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
