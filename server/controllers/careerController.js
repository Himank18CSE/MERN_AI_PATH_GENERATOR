const Career = require("../models/Career");
const generateCareerAI = require("../utils/aiClient");

const generateCareerPath = async (req, res) => {
  try {
    const { skills, interests, education, goal } = req.body;

    // Basic validation
    if (!skills || !interests) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let aiResult;

    try {
      //  Try AI
      aiResult = await generateCareerAI({
        skills,
        interests,
        education,
        goal,
      });
    } catch (aiErr) {
      console.error("AI FAILED, USING FALLBACK:", aiErr.message);

      // Fallback (NO FAIL)
      aiResult = {
        career: "Software Engineer",
        reason: "Based on your interest in technology.",
        roadmap: ["Programming", "DSA", "Projects"],
      };
    }

    const saved = await Career.create({
      skills,
      interests,
      education,
      goal,
      suggestedCareer: aiResult.career,
      reason: aiResult.reason,
      roadmap: aiResult.roadmap,
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error("CONTROLLER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

  const getCareerHistory = async (req, res) => {
  try {
    const history = await Career.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "History fetch failed" });
  }
};
const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Career.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Career not found" });
    }

    res.json({ message: "Career deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    career.favorite = !career.favorite;
    await career.save();

    res.json({ message: "Favorite updated", favorite: career.favorite });
  } catch (err) {
    res.status(500).json({ message: "Failed to update favorite" });
  }
};



module.exports = { generateCareerPath,getCareerHistory,deleteCareer,toggleFavorite};
