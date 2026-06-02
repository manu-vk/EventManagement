import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    venue: "",
    date: "",
    price: "",
    capacity: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data.events || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${id}`);

      toast.success("Event Deleted Successfully");

      fetchEvents();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const updateEvent = async () => {
    try {
      await API.put(
        `/events/${editingEvent._id}`,
        editForm
      );

      toast.success("Event Updated Successfully");

      setEditingEvent(null);

      fetchEvents();
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">


      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-blue-700">
          Manage Events
        </h1>

        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          <FaArrowLeft />
          Dashboard
        </button>

      </div>

     

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-700 text-white">

            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Venue</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Capacity</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {events.length > 0 ? (
              events.map((event) => (
                <tr
                  key={event._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {event.title}
                  </td>

                  <td className="p-4">
                    {event.venue}
                  </td>

                  <td className="p-4">
                    {new Date(event.date).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    ₹{event.price}
                  </td>

                  <td className="p-4">
                    {event.capacity}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-5">

                      <button
                        onClick={() => {
                          setEditingEvent(event);

                          setEditForm({
                            title: event.title,
                            venue: event.venue,
                            date: event.date?.split("T")[0],
                            price: event.price,
                            capacity: event.capacity,
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800 text-lg"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Events Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      

      {editingEvent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold text-blue-700 mb-5">
              Edit Event
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                value={editForm.venue}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    venue: e.target.value,
                  })
                }
                placeholder="Venue"
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    date: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    price: e.target.value,
                  })
                }
                placeholder="Price"
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="number"
                value={editForm.capacity}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    capacity: e.target.value,
                  })
                }
                placeholder="Capacity"
                className="w-full border p-3 rounded-lg"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setEditingEvent(null)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={updateEvent}
                className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                Update Event
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageEvents;