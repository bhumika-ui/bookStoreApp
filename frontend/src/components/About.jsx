import React from "react";

function About() {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-35 pb-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            About <span className="text-pink-500">Us</span>
          </h1>
        </div>
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p>
            Welcome to Book Store! We are passionate about bringing the best
            books to readers around the world. Our mission is to make learning
            accessible and enjoyable for everyone.
          </p>
          <p>
            {" "}
            Founded in 2024, we've helped thousands of readers discover their
            next favorite book. Whether you're looking for free educational
            content or premium courses, we've got you covered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-pink-500">1000+</h3>
              <p>Books Available</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-pink-500">500+</h3>
              <p>Happy Readers</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-pink-500">50+</h3>
              <p>Free Courses</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default About;