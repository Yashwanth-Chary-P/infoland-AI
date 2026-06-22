import express from "express";
import PlotBasic from "../models/PlotBasic.model.js";

const router = express.Router();

// ✅ GET all basic plots
router.get("/", async (req, res) => {
  try {
    const plots = await PlotBasic.find();
    res.status(200).json(plots);
  } catch (error) {
    console.error("Error fetching basic plots:", error);
    res.status(500).json({ message: "Failed to fetch basic plots" });
  }
});

// ✅ GET single basic plot by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const plot = await PlotBasic.findOne({ plotId: id });

    if (!plot) {
      return res.status(404).json({ message: "Plot not found" });
    }

    res.status(200).json(plot);
  } catch (error) {
    console.error("Error fetching single basic plot:", error);
    res.status(500).json({ message: "Failed to fetch plot" });
  }
});

export default router;
