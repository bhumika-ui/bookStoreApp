import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";

function Cards({ item }) {
  const { addToCart } = useCart();
  const { authUser } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Please login to add items to cart");
      document.getElementById("my_modal_3").showModal();
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if(!authUser) {
      toast.error("Please login to add to wishlist");
      document.getElementById("my_modal_3").showModal();
      return;
    }
    const added = toggleWishlist(item);
    if(added) {
      toast.success(`${item.name} added to wishlist`);
    } else {
      toast.success(`${item.name} removed from wishlist`);
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3 h-full">
        <div className="card bg-base-100 w-full h-full shadow-xl hover:scale-105 duration-200">
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-pink-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                authUser && isInWishlist(item._id)
                  ? "fill-pink-500 text-pink-500"
                  : "fill-none text-gray-500"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <Link to={`/book/${item._id}`}>
            <figure>
              <img
                src={item.image}
                alt="Books"
                className="h-60 w-full object-cover"
              />
            </figure>
          </Link>
          <div className="card-body">
            <Link to={`/book/${item._id}`}>
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">{item.category}</div>
              </h2>
            </Link>
            <p className="line-clamp-2">{item.title}</p>
            <div className="card-actions justify-between mt-auto">
              <div className="badge badge-outline">
                {item.price === 0 ? "Free" : `$${item.price}`}
              </div>
              <button
                onClick={handleAddToCart}
                className="cursor-pointer px-2 py-1 rounded-full border-2px hover:bg-pink-500 hover:text-white duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
