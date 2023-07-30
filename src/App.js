// import logo from './logo.svg';
import "./App.css";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
// import "../Navbar.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./components/../CSS/Signup.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import Createpost from "./screens/Createpost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";
import MyFolliwngPosts from "./screens/MyFollowingPosts";
function App() {
  const [userLogin, setuserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setuserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            {/* <Route path="/" element={<Navbar />}/> */}
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<Createpost />} />
            <Route path="/followingpost" element={<MyFolliwngPosts />} />
            <Route path="/profile/:userid" element={<UserProfile />} />
          </Routes>
          <ToastContainer theme="dark" />
          {/* <Modal /> */}
          {/* <Modal></Modal> */}
          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
