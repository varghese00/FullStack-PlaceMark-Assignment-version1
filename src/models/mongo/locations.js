import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  stationid: {
    type: Schema.Types.ObjectId,
    ref: "Station",
  },
});

export const Location = Mongoose.model("Location", locationSchema);