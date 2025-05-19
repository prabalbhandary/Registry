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
import { PiToggleLeftFill, PiToggleRightFill, PiTrashFill  } from "react-icons/pi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axios.delete(`${URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          toast.success("User deleted successfully");
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          toast.error("Failed to delete user");
        }
      } catch (error) {
        setError(error);
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleToggle = async (id, is_approved) => {
    try {
      const res = await axios.get(`${URL}/approve-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { is_approved: !is_approved },
      });

      if (res.status === 200) {
        toast.success("User status updated");
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, is_approved: !user.is_approved } : user
          )
        );
      } else {
        toast.error("Failed to update user status");
      }
    } catch (error) {
      setError(error);
      console.error("Error updating user status:", error);
    }
  };

  const handleChangeRole = async (id, is_admin) => {
    try {
      const res = await axios.put(`${URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { is_admin: !is_admin },
      });

      if (res.status === 200) {
        toast.success("User role updated");
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, is_admin: !user.is_admin } : user
          )
        );
      } else {
        toast.error("Failed to update user role");
      }
    } catch (error) {
      setError(error);
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.status === 200) {
          setUsers(res.data.data);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <title>Users - Trauma Registry</title>
      <div className="bg-white text-black p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>
      <hr />
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching users: {error.message}</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">S.No.</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Is Admin</th>
                <th className="py-2 px-4">Is Approved</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 text-center">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {user.email}
                  </td>

                  {/* Role Toggle */}
                  <td className="py-2 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <label className="inline-flex items-center cursor-pointer">
                        {user.is_admin ? (
                          <PiToggleRightFill
                            className="text-green-500 text-5xl cursor-pointer"
                            title="Click to make user"
                            onClick={() =>
                              handleChangeRole(user.id, user.is_admin)
                            }
                          />
                        ) : (
                          <PiToggleLeftFill
                            className="text-gray-400 text-5xl cursor-pointer"
                            title="Click to make admin"
                            onClick={() =>
                              handleChangeRole(user.id, user.is_admin)
                            }
                          />
                        )}
                      </label>
                      {user.is_admin ? (
                        <FaUserShield className="text-blue-600" title="Admin" />
                      ) : (
                        <FaUser className="text-gray-500" title="User" />
                      )}
                    </div>
                  </td>

                  {/* Approval Toggle */}
                  <td className="py-2 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <label className="inline-flex items-center cursor-pointer">
                        {user.is_approved ? (
                          <PiToggleRightFill
                            className="text-green-500 text-5xl cursor-pointer"
                            title="Click to make user"
                            onClick={() => handleToggle(user.id)}
                          />
                        ) : (
                          <PiToggleLeftFill
                            className="text-gray-400 text-5xl cursor-pointer"
                            title="Click to make admin"
                            onClick={() => handleToggle(user.id)}
                          />
                        )}
                      </label>
                      {user.is_approved ? (
                        <FaCheckCircle
                          className="text-green-600"
                          title="Approved"
                        />
                      ) : (
                        <FaTimesCircle
                          className="text-red-500"
                          title="Not Approved"
                        />
                      )}
                    </div>
                  </td>

                  {/* Delete Button */}
                  <td className="flex justify-center py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600 flex items-center justify-center"
                    >
                      <PiTrashFill className="text-white" />
                      <span className="ml-2">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Users;
