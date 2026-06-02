import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { upload } from "../middleware/multer.js";

const router = express.Router();


router.post("/", upload.single("image"), createEvent);


router.get("/", getEvents);

router.get("/:id", getEventById);




router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
