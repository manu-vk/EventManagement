import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaImage,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    price: "",
    capacity: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createEvent = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("venue", formData.venue);
      data.append("date", formData.date);
      data.append("price", formData.price);
      data.append("capacity", formData.capacity);

    
      data.append("image", image);

      await API.post("/events", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event Created Successfully!");

      setFormData({
        title: "",
        description: "",
        venue: "",
        date: "",
        price: "",
        capacity: "",
      });

      setImage(null);

      navigate("/admin");

    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        <button
          onClick={() => navigate("/admin")}
          className="mb-5 text-blue-600 font-semibold bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
           Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Create Event
        </h1>

        <form onSubmit={createEvent} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

          </div>

          <div className="border p-3 rounded-lg flex items-center gap-2">
            <FaImage />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg"
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateEvent;