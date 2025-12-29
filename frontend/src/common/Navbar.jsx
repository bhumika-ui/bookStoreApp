import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { authUser } = useAuth();
  const { setSearchQuery, setSearchResults, setIsSearching } = useSearch();
  const { getCartCount } = useCart();
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce(inputValue, 500);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  useEffect(() => {
    const searchBooks = async () => {
      if (debouncedSearch.trim() === "") {
        setSearchResults([]);
        setSearchQuery("");
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setSearchQuery(debouncedSearch);

      try {
        const res = await axios.get(
          `http://localhost:3000/book/search?q=${debouncedSearch}`
        );
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    searchBooks();
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      navigate(`/search?q=${inputValue}`);
    }
  };

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/course">Course</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </>
  );
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-base-100 ${
          sticky ? "shadow-md transition-all duration-300" : ""
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-20">
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  {navItems}
                </ul>
              </div>
              <a className="text-2xl font-bold cursor-pointer">Book Store</a>
            </div>

            <div className="navbar-end space-x-3">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
              </div>

              <div className="hidden md:block">
                <label className="px-3 py-2 border rounded-md flex items-center gap-2">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </g>
                  </svg>
                  <input
                    type="search"
                    required
                    placeholder="Search"
                    className="grow outline-none bg-transparent"
                    value={inputValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                  />
                </label>
              </div>

              <Link to="/cart" className="relative">
                <div className="p-2 hover:bg-base-200 rounded-full cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </div>
              </Link>

              <label className="swap swap-rotate">
                <input type="checkbox" />
                <svg
                  className="swap-off h-7 w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                ></svg>
                <svg
                  className="swap-on h-7 w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                ></svg>
              </label>

              {authUser ? (
                <Logout />
              ) : (
                <div>
                  <a
                    className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </a>
                  <Login />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
