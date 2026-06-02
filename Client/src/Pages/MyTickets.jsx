import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyTickets() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get(`/tickets/user/${user.id}`);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">

      
      <button
        onClick={() => navigate("/profile")}
        className="mb-6 bg-yellow-300 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Profile
      </button>

      <h1 className="text-3xl font-bold text-yellow-300 mb-8 text-center">
        My Tickets
      </h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">
          No tickets booked yet
        </p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

          {tickets.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={
                  t.event?.image
                    ? `http://localhost:5000${t.event.image}`
                    : "https://via.placeholder.com/400x200"
                }
                alt="event"
                className="h-40 w-full object-cover"
              />

              <div className="p-4">

                <h2 className="text-xl font-bold mb-1">
                  {t.event?.title}
                </h2>

                <p className="text-gray-600">
                  📍 {t.event?.venue}
                </p>

                <p className="text-gray-600 mb-2">
                  📅 {t.event?.date}
                </p>

                <p className="text-green-600 font-bold mb-2">
                  Ticket ID: {t.ticketId}
                </p>

                {t.qrCode && (
                  <img
                    src={t.qrCode}
                    alt="QR Code"
                    className="w-28 h-28 mx-auto"
                  />
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyTickets;