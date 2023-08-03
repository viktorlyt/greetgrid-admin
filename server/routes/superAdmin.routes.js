import express from "express";

import {
  getAllSuperAdmins,
  getSuperAdminInfoByID,
  createSuperAdmin,
} from "../controllers/superAdmin.controller.js";

const router = express.Router();

router.route("/").get(getAllSuperAdmins);
router.route("/").post(createSuperAdmin);
router.route("/:id").get(getSuperAdminInfoByID);

export default router;
