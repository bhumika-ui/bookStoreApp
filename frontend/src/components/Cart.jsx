import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-10">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-6">Looks like you haven't added any books yet.</p>
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row gap-4 p-4 mb-4 bg-base-100 rounded-lg shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w=full md:w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm opacity-70">{item.category}</p>
                <p className="text-pink-500 font-bold mt-2">
                  {item.price === 0 ? "Free" : `$${item.price}`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => handleRemove(item._id, item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline btn-error mt-4"
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-base-100 p-6 rounded-lg shadow sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-pink-500">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <button className="btn bg-pink-500 hover:bg-pink-700 text-white w-full">
              Proceed to Checkout
            </button>

            <Link to="/course" className="btn btn-outline w-full mt-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
