import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function Cards({ item }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <>
      <div className="mt-4 my-3 p-3 h-full">
        <div className="card bg-base-100 w-full h-full shadow-xl hover:scale-105 duration-200">
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
