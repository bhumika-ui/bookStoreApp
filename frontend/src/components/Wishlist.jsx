import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (id, name) => {
    removeFromWishlist(id);
    toast.success(`${name} remove from wishlist`);
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    toast.success(`${item.name} moved to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-10">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Emplty</h1>
          <p className="mb-6">Save items you love for later!</p>
          <Link
            to="/course"
            className="btn bg-pink-500 hover:bg-pink-700 text-white"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-10">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist ({wishlistItems.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <Link to={`/book/${item._id}`}>
                <h2 className="card-title hover:text-pink-500">{item.name}</h2>
              </Link>
              <div className="badge badge-secondary">{item.category}</div>
              <p className="text-pink-500 font-bold">
                {item.price === 0 ? "Free" : `$${item.price}`}
              </p>
              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-sm bg-pink-500 hover:bg-pink-700 text-white"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleRemove(item._id, item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
