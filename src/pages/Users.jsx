import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../components/URL";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaUserShield,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  PiToggleLeftFill,
  PiToggleRightFill,
  PiTrashFill,
} from "react-icons/pi";
import Loader from "../components/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =============================
  // Delete User
  // =============================
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`${URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          toast.success("User deleted");
          setUsers(users.filter((u) => u.id !== id));
          Swal.fire("Deleted!", "User has been removed.", "success");
        }
      } catch (err) {
        toast.error("Error deleting user");
        setError(err);
      }
    }
  };

  // =============================
  // Toggle Approved State
  // =============================
  const handleToggle = async (id, is_approved) => {
    try {
      const res = await axios.get(`${URL}/approve-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { is_approved: !is_approved },
      });

      if (res.status === 200) {
        toast.success("User updated");
        setUsers(
          users.map((u) =>
            u.id === id ? { ...u, is_approved: !u.is_approved } : u
          )
        );
      }
    } catch (err) {
      setError(err);
      toast.error("Error updating user");
    }
  };

  // =============================
  // Toggle Role Admin/User
  // =============================
  const handleChangeRole = async (id, is_admin) => {
    try {
      const res = await axios.put(
        `${URL}/user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { is_admin: !is_admin },
        }
      );

      if (res.status === 200) {
        toast.success("Role updated");
        setUsers(
          users.map((u) =>
            u.id === id ? { ...u, is_admin: !u.is_admin } : u
          )
        );
      }
    } catch (err) {
      setError(err);
      toast.error("Error updating role");
    }
  };

  // =============================
  // Fetch Users
  // =============================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) setUsers(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const UserCard = ({ user, index }) => (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          {index + 1}. {user.name}
        </h3>
        <button
          onClick={() => handleDelete(user.id)}
          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded flex items-center text-sm"
        >
          <PiTrashFill className="mr-1" /> Delete
        </button>
      </div>

      <p className="text-gray-600 mt-2 mb-4">{user.email}</p>

      <div className="flex justify-between">
        {/* Role */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Admin:</span>
          {user.is_admin ? (
            <PiToggleRightFill
              className="text-green-500 text-3xl cursor-pointer"
              onClick={() => handleChangeRole(user.id, user.is_admin)}
            />
          ) : (
            <PiToggleLeftFill
              className="text-gray-400 text-3xl cursor-pointer"
              onClick={() => handleChangeRole(user.id, user.is_admin)}
            />
          )}
        </div>

        {/* Approval */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Approved:</span>
          {user.is_approved ? (
            <PiToggleRightFill
              className="text-green-500 text-3xl cursor-pointer"
              onClick={() => handleToggle(user.id, user.is_approved)}
            />
          ) : (
            <PiToggleLeftFill
              className="text-gray-400 text-3xl cursor-pointer"
              onClick={() => handleToggle(user.id, user.is_approved)}
            />
          )}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <title>Users - Trauma Registry</title>

      <div className="p-4 bg-white flex justify-between items-center shadow-sm">
        <h2 className="text-2xl font-semibold">Users</h2>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 m-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error.message}
        </div>
      ) : (
        <>
          {/* Mobile View */}
          <div className="md:hidden px-4 py-2">
            {users.map((u, i) => (
              <UserCard key={u.id} user={u} index={i} />
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto p-4">
            <table className="min-w-full bg-white border rounded shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  {["#", "Username", "Email", "Admin", "Approved", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="py-3 px-4 font-semibold text-left border-b"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 border-b transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>

                    {/* Admin Toggle */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {user.is_admin ? (
                          <PiToggleRightFill
                            className="text-green-500 text-4xl cursor-pointer"
                            onClick={() =>
                              handleChangeRole(user.id, user.is_admin)
                            }
                          />
                        ) : (
                          <PiToggleLeftFill
                            className="text-gray-400 text-4xl cursor-pointer"
                            onClick={() =>
                              handleChangeRole(user.id, user.is_admin)
                            }
                          />
                        )}
                        {user.is_admin ? (
                          <FaUserShield className="text-blue-600" />
                        ) : (
                          <FaUser className="text-gray-500" />
                        )}
                      </div>
                    </td>

                    {/* Approved Toggle */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {user.is_approved ? (
                          <PiToggleRightFill
                            className="text-green-500 text-4xl cursor-pointer"
                            onClick={() =>
                              handleToggle(user.id, user.is_approved)
                            }
                          />
                        ) : (
                          <PiToggleLeftFill
                            className="text-gray-400 text-4xl cursor-pointer"
                            onClick={() =>
                              handleToggle(user.id, user.is_approved)
                            }
                          />
                        )}

                        {user.is_approved ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )}
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center"
                      >
                        <PiTrashFill />
                        <span className="ml-2 hidden lg:inline">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Users;
