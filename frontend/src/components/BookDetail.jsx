import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <Link to="/course" className="btn bg-pink-500 text-white mt-4">
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <img
            src={book.image}
            alt={book.name}
            className="w-full rounded-lg shadow-xl"
          />
        </div>

        <div className="md:w-2/3 space-y-4">
          <h1 className="text-3xl md:text=4xl font-bold">{book.name}</h1>
          <div className="badge badge-secondary badge-lg">{book.category}</div>
          <p className="text-lg">{book.title}</p>

          <div className="text-3xl font-bold text-pink-500">
            {book.price === 0 ? "Free" : `$${book.price}`}
          </div>

          <div className="flex gap-4 pt-4">
            <button className="btn bg-pink-500 hover:bg-pink-700 text-white">
              {book.price === 0 ? "Get Free" : "Buy Now"}
            </button>
            <button className="btn btn-outline">Add to Whishlist</button>
          </div>

          <div className="divider"></div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              repudiandae velit doloremque ab aperiam ipsum esse veniam, dolores
              exercitationem! Officia.
            </p>
          </div>

          <Link to="/course" className="btn btn-ghost mt-4">
            ← Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
