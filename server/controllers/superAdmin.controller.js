import mongoose from "mongoose";
import SuperAdmin from "../mongodb/models/superAdmin.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.find({}).limit(req.query._end);

    res.status(200).json(superAdmins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const superAdminExists = await SuperAdmin.findOne({ email });

    if (superAdminExists) return res.status(200).json(superAdminExists);

    const newSuperAdmin = await SuperAdmin.create({
      name,
      email,
      avatar,
    });

    return res.status(200).json(newSuperAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSuperAdminInfoByID = async (req, res) => {};

export { getAllSuperAdmins, getSuperAdminInfoByID, createSuperAdmin };
