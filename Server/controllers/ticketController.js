import Ticket from "../models/ticketModel.js";
import QRCode from "qrcode";

export const bookTicket = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

  
    const existingTicket = await Ticket.findOne({
      user: userId,
      event: eventId,
    });

    if (existingTicket) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this event",
      });
    }

    const ticketId =
      "TKT-" +
      Date.now() +
      "-" +
      Math.floor(Math.random() * 10000);

    const qrCode = await QRCode.toDataURL(ticketId);

    const ticket = await Ticket.create({
      user: userId,
      event: eventId,
      ticketId,
      qrCode,
    });

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.params.userId,
    }).populate("event");

    res.status(200).json({
      success: true,
      tickets,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .populate("event", "title date");

    res.status(200).json({
      success: true,
      tickets,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};