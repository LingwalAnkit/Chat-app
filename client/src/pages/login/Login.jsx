import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ email, password });
      
      if (response.success) {
        // You might want to handle successful login here, e.g.:
        // - Store the token in localStorage
        // - Update auth context
        // - Redirect to dashboard
        toast.success(response.message)
        localStorage.setItem('token', response.token);
        navigate("/")
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-center bg-white rounded-3xl py-12 px-12 shadow-2xl w-full max-w-5xl mx-auto transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col w-full md:w-1/2 max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin} noValidate>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-3 text-black rounded-lg border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-gray-100`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email) {
                      setFormErrors(prev => ({ ...prev, email: "" }));
                    }
                  }}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`w-full px-4 py-3 text-black rounded-lg border ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-gray-100`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password) {
                      setFormErrors(prev => ({ ...prev, password: "" }));
                    }
                  }}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              <Link to="/register" className="w-full block">
                <button
                  type="button"
                  className="w-full py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Create New Account
                </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src={"/student-signup.png"}
            alt="Student signup illustration"
            className="w-full h-auto object-cover rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;