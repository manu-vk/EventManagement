import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import {
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaMoneyBillWave,
  FaPlusCircle,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      
      const eventRes = await API.get("/events");
      setEvents(eventRes.data.events || []);

    
      const userRes = await API.get("/auth");

      
      const sortedUsers = (userRes.data.users || [])
        .sort((a, b) => {
          const dateA = new Date(a.lastLogin || a.createdAt);
          const dateB = new Date(b.lastLogin || b.createdAt);
          return dateB - dateA;
        });

      setUsers(sortedUsers);

     
      if (currentUser?._id) {
        const ticketRes = await API.get(`/tickets/user/${currentUser._id}`);
        setTickets(ticketRes.data.tickets || []);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 text-white p-6 shadow-2xl">

        <h1 className="text-3xl font-extrabold text-center mb-12">
          EventHub Admin
        </h1>

        <ul className="flex flex-col gap-4">

          <li className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/20">
            <FaCalendarAlt />
            Dashboard
          </li>

          <Link to="/admin/create-event">
            <li className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
              <FaPlusCircle />
              Create Event
            </li>
          </Link>

          <Link to="/admin/manage-events">
            <li className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
              <FaList />
              Manage Events
            </li>
          </Link>

          <Link to="/admin/manage-bookings">
            <li className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
              <FaTicketAlt />
              Manage Bookings
            </li>
          </Link>

          <li className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
            <FaUsers />
            Users
          </li>

          <div className="border-t border-white/20 my-4"></div>

          <li
            onClick={logout}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </li>

        </ul>
      </div>

   
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
            <p className="text-gray-500">Total Events</p>
            <h2 className="text-3xl font-bold">{events.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <p className="text-gray-500">Users</p>
            <h2 className="text-3xl font-bold">{users.length}</h2>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Users
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Last Login</th>
                </tr>
              </thead>

              <tbody>

                {users.length > 0 ? (
                  users.slice(0, 5).map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">

                      <td className="py-4">{user.name}</td>
                      <td>{user.email}</td>

                      <td>
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "Never logged in"}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">
                      No Users Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;