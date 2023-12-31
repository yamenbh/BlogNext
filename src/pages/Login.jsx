import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username: username,
        password: password,
      });

      const token = response.data.accessToken;
      localStorage.setItem("jwtToken", token);

      const userId = response.data.id;
      localStorage.setItem("userId", userId);
      console.log("Stored User ID:", userId);

      const roles = response.data.roles;
      localStorage.setItem("userRoles", JSON.stringify(roles));

      navigate("/Mainindex");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
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
              <h3 className="account-title">Se connecter</h3>
              <p className="account-subtitle">Content de te revoire!!</p>
              <form onSubmit={handleLogin}>
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
                  <button
                    className="btn btn-primary account-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Se connecter"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Vous n'avez pas de compte? <Link to="/signup">Inscrivez-vous ici</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
