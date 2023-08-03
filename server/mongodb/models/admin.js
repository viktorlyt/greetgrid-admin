import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  creator: [{ type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" }],
});

const adminModel = mongoose.model("Admin", AdminSchema);

export default adminModel;
