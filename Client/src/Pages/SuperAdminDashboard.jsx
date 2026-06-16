import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaUserShield,
  FaTrash,
} from "react-icons/fa";

function SuperAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [adminForm, setAdminForm] = useState({name: "",email: "",password: "",});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };
  const createAdmin = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/auth/create-admin",
      adminForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Admin Created Successfully");

    setAdminForm({
      name: "",
      email: "",
      password: "",
    });

    fetchUsers();

  } catch (error) {
    console.log(error);
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ⭐ DELETE USER FUNCTION
  const handleDelete = async (id, role) => {
    try {
      const token = localStorage.getItem("token");

      if (role === "superadmin") {
        alert("You cannot delete a superadmin!");
        return;
      }

      await API.delete(`/auth/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 RELOAD DATA FROM SERVER (BEST FIX)
      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // FILTER LOGIC
  const filteredUsers =
    activeTab === "admins"
      ? users.filter((user) => user.role === "admin")
      : users.filter((user) => user.role === "user");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 min-h-screen bg-gradient-to-br from-yellow-300 to-orange-800 text-white p-6 shadow-2xl">

        <h1 className="text-3xl font-extrabold text-center mb-12">
          Super Admin
        </h1>

        <ul className="flex flex-col gap-4">

          <li className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/20">
            <FaCalendarAlt />
            Dashboard
          </li>

          <li
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer ${activeTab === "users" ? "bg-white/20" : "hover:bg-white/10"
              }`}
          >
            <FaUsers />
            Users
          </li>
          <li
            onClick={() => setActiveTab("createAdmin")}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer ${activeTab === "createAdmin"
                ? "bg-white/20"
                : "hover:bg-white/10"
              }`}
          >
            <FaUserShield />
            Create Admin
          </li>

          <li
            onClick={() => setActiveTab("admins")}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer ${activeTab === "admins" ? "bg-white/20" : "hover:bg-white/10"
              }`}
          >
            <FaUserShield />
            Admins
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

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Super Admin Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold">{users.length - 2}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-600">
            <p className="text-gray-500">Admins</p>
            <h2 className="text-3xl font-bold">
              {users.filter((u) => u.role === "admin").length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
            <p className="text-gray-500">Super Admins</p>
            <h2 className="text-3xl font-bold">
              {users.filter((u) => u.role === "superadmin").length}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

          <h2 className="text-2xl font-bold text-purple-700 mb-5">
            {activeTab === "admins" ? "Admin Accounts" : "User Accounts"}
          </h2>

          <div className="overflow-x-auto">
            {activeTab === "createAdmin" && (
  <div className="bg-white p-6 rounded-xl shadow-lg">

    <h2 className="text-2xl font-bold mb-5">
      Create Admin
    </h2>

    <form
      onSubmit={createAdmin}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Admin Name"
        value={adminForm.name}
        onChange={(e) =>
          setAdminForm({
            ...adminForm,
            name: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <input
        type="email"
        placeholder="Admin Email"
        value={adminForm.email}
        onChange={(e) =>
          setAdminForm({
            ...adminForm,
            email: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={adminForm.password}
        onChange={(e) =>
          setAdminForm({
            ...adminForm,
            password: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <button
        type="submit"
        className="bg-purple-600 text-white py-3 rounded"
      >
        Create Admin
      </button>

    </form>
  </div>
)}

            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Role</th>
                  <th className="text-left">Last Login</th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">

                      <td className="py-4">{user.name}</td>
                      <td>{user.email}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white
                            ${user.role === "superadmin"
                              ? "bg-purple-600"
                              : user.role === "admin"
                                ? "bg-blue-600"
                                : "bg-green-600"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "Never"}
                      </td>

                      <td>
                        <button
                          onClick={() => handleDelete(user._id, user.role)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          <FaTrash />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
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

export default SuperAdminDashboard;