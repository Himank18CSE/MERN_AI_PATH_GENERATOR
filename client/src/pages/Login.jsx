import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("User", JSON.stringify(res.data.user));

      // LOGIN KE BAAD HOME
      navigate("/", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center  dark:bg-gray-900  rounded-xl shadow hover:shadow-lg transition p-6">
       <div className="bg-white dark:bg-gray-800 dark:text-gray-100 w-[380px] rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl  dark:text-gray-100  font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  dark:text-gray-900"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  dark:text-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
