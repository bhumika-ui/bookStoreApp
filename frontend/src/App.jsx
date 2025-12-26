import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthProvider";
import Contacts from "./contact/Contacts";
import Abouts from "./about/Abouts";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      {/* {<Home/> */}
      {/* <Course/>} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/about" element={<Abouts />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
