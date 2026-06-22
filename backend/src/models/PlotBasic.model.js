import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  builder: { type: String, required: true },
});

const plotBasicSchema = new mongoose.Schema({
  plotId: { type: Number, required: true, unique: true },
  owner: { type: String, required: true },
  soilType: { type: String, required: true },
  area: { type: Number, required: true },
  suitability: { type: String, required: true },
  recommendations: [recommendationSchema],
});

const PlotBasic = mongoose.model("PlotBasic", plotBasicSchema);

export default PlotBasic;
