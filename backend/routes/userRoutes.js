import express from "express";

import upload from "../middleware/upload.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getClientStatus,
  getProjectStatus,
} from "../controllers/usercontroller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", upload.single("profilePicture"), createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/status/client", getClientStatus);
router.get("/status/project", getProjectStatus);

export default router;
