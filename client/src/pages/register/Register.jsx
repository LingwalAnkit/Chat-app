import { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import logo from "../../../public/student-signup.png"
import { registerUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await registerUser(user)
            if(response.success){
                toast.success(response.message)
                navigate("/login")
            }
            else{
                toast.error(response.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-white rounded-3xl py-12 px-12 shadow-2xl w-full max-w-5xl mx-auto transition-all duration-300 hover:shadow-xl">
                <img
                    src={logo} // Update with the correct path
                    alt="logo"
                    className="w-full md:w-1/2 bg-blue-300 h-auto object-cover rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="flex flex-col gap-6 w-full md:w-1/2 max-w-md">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
                        Create Account
                    </h1>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <input
                        type="text"
                        name="name"
                        placeholder="Username"
                        value={user.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                    <Link to="/login" className="w-full">
                        <button
                            type="button"
                            className="w-full py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                            Already have an account? Log In
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default Register;
