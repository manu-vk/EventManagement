import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data.event);

      const ticketRes = await API.get(`/tickets/user/${user.id}`);

      const booked = ticketRes.data.tickets.some(
        (ticket) => ticket.event?._id === id
      );

      setAlreadyBooked(booked);

    } catch (err) {
      console.log(err);
    }
  };
  const confirmBooking = async () => {
    try {
      await API.post("/tickets/book", {
        userId: user.id,
        eventId: id,
      });

      toast.success("Ticket Booked Successfully!");

      setAlreadyBooked(true);

      navigate("/profile");

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Booking Failed"
      );
    }
  };

  if (!event) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">

      <div className="bg-white rounded-xl shadow-lg w-[320px] overflow-hidden animate-[pop_0.4s_ease-out]">

       
        <img
          src={`http://localhost:5000${event.image}`}
          alt={event.title}
          className="w-full h-56 object-cover"
        />

      
        <div className="p-6">

          <h1 className="text-2xl font-bold mb-3">
            {event.title}
          </h1>

          <p className="mb-2 text-gray-600">
            📍 {event.venue}
          </p>

          <p className="mb-2 text-gray-600">
            📅 {event.date}
          </p>

          <p className="mb-4 text-green-600 font-bold text-lg">
            ₹ {event.price}
          </p>

          {alreadyBooked ? (
            <button
              disabled
              className="w-full bg-gray-500 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Already Booked ✓
            </button>
          ) : (
            <button
              onClick={confirmBooking}
              className="w-full bg-green-600 text-white py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              Confirm Booking
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 bg-yellow-300 hover:bg-blue-600 text-white py-3 rounded-lg transition"
          >
            Back to Events
          </button>

        </div>
      </div>

    </div>
  );
}

export default BookingPage;