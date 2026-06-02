import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("profile");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get(`/tickets/user/${user.id}`);
      setTickets(res.data.tickets);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-black">

    
      <div className="w-[220px] bg-gray-200 flex flex-col py-6 px-4 shadow-md">

        <h2 className="text-xl font-bold mb-8">My Account</h2>

        <ul className="flex flex-col gap-3">

          <li
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${activeTab === "profile" ? "text-blue-500 font-bold" : ""
              }`}
          >
            Profile
          </li>

          <li
            onClick={() => setActiveTab("bookings")}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${activeTab === "bookings" ? "text-blue-500 font-bold" : ""
              }`}
          >
            Booking History
          </li>

          <li
            onClick={() => navigate("/")}
            className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100 text-blue-500"
          >
            Browse Events
          </li>

          <li
            onClick={logout}
            className="cursor-pointer px-3 py-2 rounded hover:bg-red-100 text-red-500"
          >
            Logout
          </li>

        </ul>
      </div>

      
      <div className="flex-1 p-10">

       
        {activeTab === "profile" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-yellow-500">
              Welcome {user?.name}
            </h1>

            <div className="bg-yellow-300 p-6 rounded-xl shadow-md w-full max-w-md">

              <p className="text-white mb-2">
                <b>Name:</b> {user?.name}
              </p>

              <p className="text-white mb-4">
                <b>Email:</b> {user?.email}
              </p>

              <button
                onClick={() => navigate("/my-tickets")}
                className="w-full bg-black hover:bg-blue-700 text-white py-3 rounded-lg transition"
              >
                View My Tickets
              </button>

            </div>
          </>
        )}

       
        {activeTab === "bookings" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-yellow-300">
              Booking History
            </h2>

            {tickets.length === 0 ? (
              <p className="text-gray-500">No tickets booked yet</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">

                {tickets.map((t) => (
                  <div
                    key={t._id}
                    className="bg-yellow-300 p-4 rounded-xl shadow"
                  >
                    <h3 className="font-bold text-lg">
                      {t.event?.title}
                    </h3>

                    <p className="text-gray-600">
                      📍 {t.event?.venue}
                    </p>

                    <p className="text-gray-600">
                      📅 {t.event?.date}
                    </p>

                    <p className="text-black font-bold mt-2">
                      Ticket ID: {t.ticketId}
                    </p>
                  </div>
                ))}

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Profile;