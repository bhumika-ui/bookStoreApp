import React from "react";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./pages/courses/Courses";
import Signup from "./common/Signup";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthProvider";
import Contacts from "./pages/contact/Contacts";
import Abouts from "./pages/about/Abouts";
import BookDetails from "./pages/bookDetail/bookDetails";
import Layout from "./components/Layout";
import SearchResults from "./components/SearchResults";
import Cart from "./components/Cart";

function App() {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <>
      <Layout>
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
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;
