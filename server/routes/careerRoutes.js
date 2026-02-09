const express = require("express");
const router = express.Router();

const { generateCareerPath,getCareerHistory,deleteCareer,toggleFavorite} = require("../controllers/careerController");

router.post("/", generateCareerPath);
router.get("/dashboard",getCareerHistory);
router.delete("/:id", deleteCareer);
router.patch("/:id/favorite",toggleFavorite);


module.exports = router;
