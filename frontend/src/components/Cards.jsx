import React from "react";

function Cards({ item }) {
    return (
      <>
        <div className="mt-4 my-3 p-3 h-full">
          <div className="card bg-base-100 w-full h-full shadow-xl hover:scale-105 duration-200">
            <figure>
              <img
                src={item.image}
                alt="Books"
                className="h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">{item.category}</div>
              </h2>
              <p className="line-clamp-2">{item.title}</p>
              <div className="card-actions justify-between mt-auto">
                <div className="badge badge-outline">${item.price}</div>
                <div className="cursor-pointer px-2 py-1 rounded-full border-2px hover:bg-pink-500 hover:text-white duration-200">Buy Now</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

}

export default Cards;