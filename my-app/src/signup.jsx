import axios from "axios";
import { useState } from "react";
import { MdOutlineMailOutline, MdOutlineSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password }); 
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while registering. Please try again.");
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-6 rounded shadow-md border-2 border-red-900">
        <h1 className="text-blue-600 text-center text-4xl font-extrabold mb-4">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="w-full h-10 pl-3 pr-3 rounded border border-gray-300 placeholder:italic outline-none"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xl">
              <MdOutlineMailOutline />
            </span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-full h-10 pl-10 pr-3 rounded border border-gray-300 placeholder:italic outline-none"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xl">
              <MdOutlineSearch />
            </span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter Your Password"
              className="w-full h-10 pl-10 pr-3 rounded border border-gray-300 placeholder:italic outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 w-full h-10 rounded mb-2"
          >
            Register
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-2 text-center">
          Already have an account?
        </p>

        <div className="flex justify-center mt-2">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
