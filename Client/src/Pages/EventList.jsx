import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function EventList() {
    const [events, setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await API.get("/events");
            setEvents(res.data.events);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-black">

            
            <nav className="bg-yellow-400 text-white px-8 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">
                    EventHub
                </h1>

                {
                    user ? (
                        <Link to="/profile">
                            <FaUserCircle className="text-4xl text-white cursor-pointer" />
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-blue-400 px-4 py-2 rounded-lg font-semibold"
                        >
                            Login
                        </Link>
                    )
                }
            </nav>

          
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">

                    <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-500 to-emerald-700 bg-clip-text text-transparent mb-4">
                        Discover Events
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find and book amazing events near you.
                    </p>
                </div>

             
                <div className="grid md:grid-cols-3 gap-8">

                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 active:scale-85 transition-all duration-300 cursor-pointer max-w-[300px] mx-auto"
                        >

                            <img
                                src={`http://localhost:5000${event.image}`}
                                alt="event"
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-5">

                                <h3 className="text-xl font-bold mb-2">
                                    {event.title}
                                </h3>

                                <p className="text-gray-600 mb-2">
                                    📍 {event.venue}
                                </p>

                                <p className="text-gray-600 mb-2">
                                    📅 {event.date}
                                </p>

                                <p className="text-green-600 font-bold text-lg mb-4">
                                    ₹ {event.price}
                                </p>

                                <Link
                                    to={`/booking/${event._id}`}
                                    className="block text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
                                >
                                    Book Now
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}

export default EventList;