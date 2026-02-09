import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CareerForm = () => {
  const [form, setForm] = useState({
    skills: "",
    interests: "",
    education: "",
    goal: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await axios.post("http://localhost:5000/api/career", {
      skills: form.skills.split(","),
      interests: form.interests.split(","),
      education: form.education,
      goal: form.goal,
    });
    setResult(res.data);
    toast.success("Career path generated"); 
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
          <p className="text-gray-600 mt-2">You are successfully logged in</p>
        </div> */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-2xl shadow-lg p-8 w-full max-w-xl">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            AI Career Path Generator
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["skills", "interests", "education", "goal"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f.toUpperCase()}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
              />
            ))}

            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition">
              {loading ? "Generating..." : "Generate Career"}
            </button>
          </form>

          {result && (
            <div className="mt-8 bg-gray-50 rounded-xl p-5 dark:text-gray-800">
              <h3 className="text-lg font-semibold text-indigo-600">
                {result.suggestedCareer}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{result.reason}</p>

              <ul className="mt-3 space-y-1 text-sm">
                {result.roadmap.filter(Boolean).map((r, i) => (
                  <li key={i}>• {r.step || r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CareerForm;
