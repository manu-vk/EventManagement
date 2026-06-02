import { useState } from "react";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../services/api";
import {Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/register", formData);

            toast.success("Registration Successful!");

            setFormData({
                name: "",
                email: "",
                password: "",
            });
            navigate("/login");

        } catch (error) {
            console.log(error);
            toast.error("Registration Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-20">
            <div className="bg-blue-300 rounded-lg p-10 w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.28)]">

                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-900 p-4 rounded-full mb-3">
                        <FaUserAlt className="text-white text-xl" />
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        Create Account
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 mb-4">
                        <FaUserAlt className="mr-3 text-gray-500" />

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-transparent outline-none w-full"
                            required
                        />
                    </div>

                    <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 mb-4">
                        <FaEnvelope className="mr-3 text-gray-500" />

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent outline-none w-full"
                            required
                        />
                    </div>

                    <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 mb-4">
                        <FaLock className="mr-3 text-gray-500" />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-transparent outline-none w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-500 transition"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-base mt-6">
                        Already have an account?

                        <Link
                            to="/login"
                            className="font-semibold ml-1 text-white-500"
                        >
                            Sign In
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Register;