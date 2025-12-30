import { createContext } from "react";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const WishlistContext = createContext();

export function WhishlistProvider({ children }) {
  const { authUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (authUser) {
      const savedWishlist = localStorage.getItem(`wishlist_${authUser._id}`);
      setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
    } else {
      setWishlistItems([]);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem(
        `wishlist_${authUser._id}`,
        JSON.stringify(wishlistItems)
      );
    }
  }, [wishlistItems, authUser]);

  const addToWishlist = (book) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item._id === book._id);
      if (exists) return prev;
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== bookId));
  };

  const isInWishlist = (bookId) => {
    return wishlistItems.some((item) => item._id === bookId);
  };

  const toggleWishlist = (book) => {
    if (isInWishlist(book._id)) {
      removeFromWishlist(book._id);
      return false;
    } else {
      addToWishlist(book);
      return true;
    }
  };

  const getWishlistCount = () => wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
