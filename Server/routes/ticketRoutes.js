import express from "express";
import {bookTicket, getAllTickets, getUserTickets,} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/book", bookTicket);

router.get("/user/:userId", getUserTickets);

router.get("/", getAllTickets);

export default router;