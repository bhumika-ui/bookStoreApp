import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ typr: "", message: "" });

    try {
      const res = await axios.post(
        "http://localhost:3000/contact/send",
        formData
      );
      setStatus({ type: "success", message: res.data.message });
      setFormData({ namr: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-30 pb-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Contact <span className="text-pink-500">Us</span>
        </h1>
        <p className="mt-4">We'd love to hear from you!</p>
      </div>
      <div className="max-w-xl mx-auto">
        {status.message && (
          <div
            className={`alert ${
              status.type === "success" ? "alert-success" : "alert-error"
            } mb-4`}
          >
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="btn bg-pink-500 hover:bg-pink-700 text-white w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
