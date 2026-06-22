import express from "express";
import PlotDetailed from "../models/PlotDetailed.model.js";

const router = express.Router();

// ✅ GET all detailed plots
router.get("/", async (req, res) => {
  try {
    const plots = await PlotDetailed.find();
    res.status(200).json(plots);
  } catch (error) {
    console.error("Error fetching detailed plots:", error);
    res.status(500).json({ message: "Failed to fetch detailed plots" });
  }
});

// ✅ GET single detailed plot by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const plot = await PlotDetailed.findOne({ id: id });

    if (!plot) {
      return res.status(404).json({ message: "Plot not found" });
    }

    res.status(200).json(plot);
  } catch (error) {
    console.error("Error fetching single detailed plot:", error);
    res.status(500).json({ message: "Failed to fetch plot" });
  }
});

export default router;
