import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange= (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center  dark:bg-gray-900  rounded-xl shadow hover:shadow-lg transition p-6">
    {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"> */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 w-[380px] rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-100">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Join us and start building 🚀
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={handleChange}
              required
              className=" w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium disabled:bg-gray-400"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>

  );
};

export default Signup;
