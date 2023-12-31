import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mainindex from "./pages/Mainindex";
import Categorie from "./pages/Categorie";
import Postdetail from "./pages/Postdetail";
import Profile from "./pages/Profile";

import Post from "./pages/Post";

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Index />} />  
        <Route path="/Login" element={<Login />} />  
        <Route path="/Signup" element={<Signup />} />  
        <Route path="/Mainindex" element={<Mainindex />} />
        <Route path="/Categorie" element={<Categorie/>}/>
        <Route path="/Post" element={<Post/>}/>
        <Route path="/Postdetail/:postId" element={<Postdetail/>} />
        <Route path="/Profile" element={<Profile/>}/>

      </Routes>
    </Router>
  );
};

export default App;
