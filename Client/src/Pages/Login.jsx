import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful!");

      if (res.data.user.role === "superadmin") {
        navigate("/superadmin");
      }
      else if (res.data.user.role === "admin") {
        navigate("/admin");
      }
      else {
        navigate("/");
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-blue-300 rounded-lg p-10 w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.28)]">

        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-900 p-4 rounded-full mb-3">
            <FaLock className="text-white text-xl" />
          </div>

          <h2 className="text-xl font-bold text-white">
            Welcome
          </h2>
        </div>

        <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 mb-4">
          <FaUserAlt className="text-gray-600 mr-3" />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </div>

        <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 mb-4">
          <FaLock className="text-gray-600 mr-3" />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </div>

        <button
          className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90"
          onClick={loginUser}
        >
          Log In
        </button>

        <p className="text-center text-base mt-6">
          Don't have an account?

          <Link
            to="/register"
            className="font-semibold ml-1 text-white-500"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;