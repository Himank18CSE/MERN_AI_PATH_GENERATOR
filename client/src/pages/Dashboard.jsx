import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

/* ===============================
   🕒 SMART DATE / TIME FUNCTION
   (same as pehle wala feel)
================================ */
const getSmartTime = (item) => {
  let date =
    item.createdAt ||
    item.updatedAt ||
    (item._id && new Date(parseInt(item._id.substring(0, 8), 16) * 1000));

  if (!date) return "";

  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days === 1) return "Yesterday";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ===============================
     📥 FETCH HISTORY
  ================================ */
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/career/dashboard");
      setHistory(res.data);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ===============================
     ❌ DELETE CAREER
  ================================ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this caree?")) return;

    await axios.delete(`http://localhost:5000/api/career/${id}`);

    setHistory(history.filter((h) => h._id !== id));
  };

  /* ===============================
     ⭐ TOGGLE FAVORITE
  ================================ */
  const toggleFavorite = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/career/${id}/favorite`);

      // ✅ FUNCTIONAL STATE UPDATE (IMPORTANT)
      setHistory((prevHistory) =>
        prevHistory.map((h) =>
          h._id === id ? { ...h, favorite: !h.favorite } : h,
        ),
      );
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  };

  /* ===============================
     🔍 FILTER LOGIC
  ================================ */
  const filteredHistory =
    filter === "favorites"
      ? history.filter((h) => h.favorite === true)
      : history;

  /* ===============================
     ⏳ LOADER
  ================================ */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">
        Loading history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">
        Career History 📊
      </h2>

      {/* ===============================
         🔘 FILTER BUTTONS
      ================================ */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("favorites")}
          className={`px-4 py-2 rounded ${
            filter === "favorites"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          ⭐ Favorites
        </button>
      </div>

      {/* ===============================
         🌱 EMPTY STATE
      ================================ */}
      {filteredHistory.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-2xl mb-2">🌱</p>
          <p className="text-lg font-medium">No career history found</p>
          <p className="text-sm">Generate a career path to see it here</p>
        </div>
      ) : (
        /* ===============================
           🧾 HISTORY CARDS
        ================================ */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow hover:shadow-lg transition p-5 relative"
            >
              {/* ❌ DELETE */}
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 text-red-500"
              >
                ❌
              </button>

              {/* ⭐ FAVORITE */}
              <button
                onClick={() => toggleFavorite(item._id)}
                className="absolute top-2 left-2 text-xl cursor-pointer"
              >
                {item.favorite === true ? "⭐" : "☆"}
              </button>

              {/* CAREER TITLE */}
              <h3 className="font-semibold text-indigo-600 mb-1">
                {item.suggestedCareer}
              </h3>

              {/* 🕒 DATE / TIME */}
              <p className="text-xs text-gray-500 mb-2">
                🕒 {getSmartTime(item)}
              </p>

              {/* REASON */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {item.reason}
              </p>

              {/* ROADMAP */}
              <h4 className="text-sm font-semibold mb-1">Roadmap</h4>

              <ul className="text-sm space-y-1">
                {item.roadmap.filter(Boolean).map((r, i) => (
                  <li key={i}>• {typeof r === "string" ? r : r.step}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
