import mongoose from "mongoose";

const SuperAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
  // password: { type: String, required: true },
  // role: { type: String, required: true },
});

const superAdminModel = mongoose.model("SuperAdmin", SuperAdminSchema);

export default superAdminModel;
