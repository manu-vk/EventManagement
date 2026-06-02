import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EventList from "./Pages/EventList";
import Booking from "./Pages/Booking";
import MyTickets from "./Pages/MyTickets";
import AdminDashboard from "./Pages/AdminDashboard";
import Profile from "./Pages/Profile";
import CreateEvent from "./Pages/CreateEvent";
import ManageEvents from "./Pages/ManageEvents";
import AdminRoute from "./components/AdminRoute";
import ManageBookings from "./Pages/ManageBookings";
import SuperAdminDashboard from "./Pages/SuperAdminDashboard";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking/:id" element={<Booking />} />

        {/* Admin Dashboard */}
        <Route path="/admin"element={<AdminRoute><AdminDashboard /></AdminRoute> }/>
        <Route path="/admin/create-event"element={<AdminRoute><CreateEvent /></AdminRoute>}/>
        <Route path="/admin/manage-events"element={<AdminRoute><ManageEvents /></AdminRoute>}/>
        <Route path="/admin/manage-bookings" element={<AdminRoute><ManageBookings /></AdminRoute>}/>
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;