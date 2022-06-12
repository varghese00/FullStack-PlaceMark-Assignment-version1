import Mongoose from "mongoose";

const { Schema } = Mongoose;

const stationSchema = new Schema({
  name: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Station = Mongoose.model("Station", stationSchema);