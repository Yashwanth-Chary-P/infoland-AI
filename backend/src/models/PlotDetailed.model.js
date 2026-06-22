import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

const plotDetailedSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  Owner: { type: String, required: true },
  SurveyNo: { type: String, required: true },
  Area: { type: String, required: true },
  Village: { type: String, required: true },
  District: { type: String, required: true },
  Type: { type: String, required: true },
  RegistrationYear: { type: Number, required: true },
  Status: { type: String, required: true },
  Coordinates: {
    type: [[Number]], // [[lat, lon], [lat, lon], ...]
    required: true,
  },
});

const PlotDetailed = mongoose.model("PlotDetailed", plotDetailedSchema);

export default PlotDetailed;
