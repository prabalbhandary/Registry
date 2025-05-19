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

  // Card view for mobile screens
  const UserCard = ({ user, index }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold">
          {index + 1}. {user.name}
        </div>
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 flex items-center text-sm"
        >
          <PiTrashFill className="mr-1" />
          Delete
        </button>
      </div>
      <div className="text-gray-600 mb-1">{user.email}</div>
      <div className="flex justify-between mt-2">
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">Admin:</span>
          <label className="inline-flex items-center cursor-pointer">
            {user.is_admin ? (
              <>
                <PiToggleRightFill
                  className="text-green-500 text-3xl cursor-pointer"
                  onClick={() => handleChangeRole(user.id, user.is_admin)}
                />
                <FaUserShield className="text-blue-600 ml-1" />
              </>
            ) : (
              <>
                <PiToggleLeftFill
                  className="text-gray-400 text-3xl cursor-pointer"
                  onClick={() => handleChangeRole(user.id, user.is_admin)}
                />
                <FaUser className="text-gray-500 ml-1" />
              </>
            )}
          </label>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">Approved:</span>
          <label className="inline-flex items-center cursor-pointer">
            {user.is_approved ? (
              <>
                <PiToggleRightFill
                  className="text-green-500 text-3xl cursor-pointer"
                  onClick={() => handleToggle(user.id, user.is_approved)}
                />
                <FaCheckCircle className="text-green-600 ml-1" />
              </>
            ) : (
              <>
                <PiToggleLeftFill
                  className="text-gray-400 text-3xl cursor-pointer"
                  onClick={() => handleToggle(user.id, user.is_approved)}
                />
                <FaTimesCircle className="text-red-500 ml-1" />
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <title>Users - Trauma Registry</title>
      <div className="bg-white text-black p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>
      <hr />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
          <p>Error fetching users: {error.message}</p>
        </div>
      ) : (
        <>
          {/* For mobile screens: Card view */}
          <div className="md:hidden px-4 py-2">
            {users.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </div>

          {/* For tablet and desktop: Table view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-2 lg:px-4 text-sm lg:text-base">
                    S.No.
                  </th>
                  <th className="py-2 px-2 lg:px-4 text-sm lg:text-base">
                    Username
                  </th>
                  <th className="py-2 px-2 lg:px-4 text-sm lg:text-base">
                    Email
                  </th>
                  <th className="py-2 px-2 lg:px-4 text-sm lg:text-base">
                    Is Admin
                  </th>
                  <th className="py-2 px-2 lg:px-4 text-sm lg:text-base">
                    Is Approved
                  </th>
                  <th className="py-2 px-2 lg:px-4 text-sm lg:text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 lg:px-4 text-center text-sm lg:text-base">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 lg:px-4 text-center text-sm lg:text-base">
                      {user.name}
                    </td>
                    <td className="py-2 px-2 lg:px-4 text-center text-sm lg:text-base">
                      {user.email}
                    </td>

                    {/* Role Toggle */}
                    <td className="py-2 px-2 lg:px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <label className="inline-flex items-center cursor-pointer">
                          {user.is_admin ? (
                            <PiToggleRightFill
                              className="text-green-500 text-4xl cursor-pointer"
                              title="Click to make user"
                              onClick={() =>
                                handleChangeRole(user.id, user.is_admin)
                              }
                            />
                          ) : (
                            <PiToggleLeftFill
                              className="text-gray-400 text-4xl cursor-pointer"
                              title="Click to make admin"
                              onClick={() =>
                                handleChangeRole(user.id, user.is_admin)
                              }
                            />
                          )}
                        </label>
                        {user.is_admin ? (
                          <FaUserShield
                            className="text-blue-600"
                            title="Admin"
                          />
                        ) : (
                          <FaUser className="text-gray-500" title="User" />
                        )}
                      </div>
                    </td>

                    {/* Approval Toggle */}
                    <td className="py-2 px-2 lg:px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <label className="inline-flex items-center cursor-pointer">
                          {user.is_approved ? (
                            <PiToggleRightFill
                              className="text-green-500 text-4xl cursor-pointer"
                              title="Click to disable"
                              onClick={() =>
                                handleToggle(user.id, user.is_approved)
                              }
                            />
                          ) : (
                            <PiToggleLeftFill
                              className="text-gray-400 text-4xl cursor-pointer"
                              title="Click to approve"
                              onClick={() =>
                                handleToggle(user.id, user.is_approved)
                              }
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
                    <td className="py-2 px-2 lg:px-4 text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white py-1 px-2 lg:py-2 lg:px-3 rounded hover:bg-red-600 flex items-center justify-center text-sm"
                      >
                        <PiTrashFill className="text-white" />
                        <span className="ml-1 hidden sm:inline">Delete</span>
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
