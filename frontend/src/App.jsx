import React from "react";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./pages/courses/Courses";
import Signup from "./common/Signup";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthProvider";
import Contacts from "./pages/contact/Contacts";
import Abouts from "./pages/about/Abouts";
import BookDetails from "./pages/bookDetail/BookDetails";
import Layout from "./components/Layout";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import SearchResults from "./components/SearchResults";
import Wishlist from "./components/Wishlist";

function App() {
  const { authUser } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/about" element={<Abouts />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={authUser ? <Cart /> : <Navigate to="/signup"/>} />
          <Route path="/wishlist" element={authUser ? <Wishlist/> : <Navigate to="/signup"/>}/>
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/signup" />}
          />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
