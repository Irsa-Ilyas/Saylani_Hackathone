import axios from "axios";
import { useState } from "react";
import { MdOutlineMailOutline, MdOutlineSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();  

    axios.post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          navigate("/home"); 
        } else {
          alert(result.data.message); 
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);  
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-6 rounded shadow-md border-2 border-red-900">
        <h1 className="text-blue-600 text-center text-4xl font-extrabold mb-4">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xl">
              <MdOutlineMailOutline />
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              className="w-full h-10 pl-10 pr-3 rounded border border-gray-300 placeholder:italic outline-none"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 w-full h-10 rounded mb-2"
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-2 text-center">
          Don't have an account yet?
        </p>

        <div className="flex justify-center mt-2">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
