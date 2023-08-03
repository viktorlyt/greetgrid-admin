import mongoose from "mongoose";
import Admin from "../mongodb/models/admin.js";
import SuperAdmin from "../mongodb/models/superAdmin.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).limit(req.query._end);

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //start a new session
    const session = await mongoose.startSession();
    session.startTransaction();

    console.log(email);

    const superAdmin = await SuperAdmin.findOne({ SuperAdmin }).session(
      session
    );

    if (!superAdmin) throw new Error("SuperAdmin not found!!!!");

    // const photoUrl = await cloudinary.uploader.upload(name);

    const newAdmin = await Admin.create({
      name,
      email,
      password,
      role,
      creator: superAdmin._id,
    });

    superAdmin.allAdmins.push(newAdmin._id);

    await superAdmin.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {};
const deleteteAdmin = async (req, res) => {};
const getAdminInfoByID = async (req, res) => {};

export {
  getAllAdmins,
  getAdminInfoByID,
  createAdmin,
  deleteteAdmin,
  updateAdmin,
};
