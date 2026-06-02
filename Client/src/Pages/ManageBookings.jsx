import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ManageBookings() {
  const [tickets, setTickets] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);
 

  const fetchBookings = async () => {
    try {
      const res = await API.get("/tickets");
      setTickets(res.data.tickets);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">



      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Manage Bookings
      </h1>
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Back to
        Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Ticket ID</th>
              <th className="text-left">.</th>
              <th className="text-left">Event</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>

          <tbody>

            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b"
              >
                <td className="py-3">{ticket.ticketId}</td>

                <td>
                  {ticket.user?.name}
                </td>

                <td>
                  {ticket.event?.title}
                </td>

                <td>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageBookings;