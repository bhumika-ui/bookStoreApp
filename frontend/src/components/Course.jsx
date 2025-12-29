import React, { useEffect, useState } from "react";
import Cards from "../common/Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:3000/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-20 pb-10">
        <div className="mt-8 item-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here!:)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
            ipsum quas repudiandae. Laborum magni repellendus neque dolores
            inventore sequi molestias, eos totam quasi. Eveniet quae
            voluptatibus nihil veritatis ducimus error aspernatur, eaque
            consectetur neque ad eligendi laudantium expedita illo possimus,
            dolorum rem harum incidunt atque. Tenetur a officia blanditiis quis!
          </p>
          <Link to={"/"}>
            <button className="bg-pink-500 hover:bg-pink-700 duration:300 text-white rounded-md px-4 py-2 mt-6">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
