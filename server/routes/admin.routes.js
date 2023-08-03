import express from "express";

import {
  getAllAdmins,
  getAdminInfoByID,
  createAdmin,
  deleteteAdmin,
  updateAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/").get(getAllAdmins);
router.route("/").post(createAdmin);
router.route("/:id").get(getAdminInfoByID);
router.route("/:id").patch(updateAdmin);
router.route("/:id").delete(deleteteAdmin);

export default router;
