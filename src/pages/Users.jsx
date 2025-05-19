import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../components/URL";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      setError(error);
      console.error("Error deleting user:", error);
    }
  };

  const handleApproveDisapproveUser = async (id, is_approved) => {
    try {
      const res = await axios.get(
        `${URL}/approve-user/${id}`,
        { is_approved: !is_approved },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
      const res = await axios.get(
        `${URL}/user/${id}`,
        { is_admin: !is_admin },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b text-center">{user.id}</td>
                  <td className="py-2 px-4 border-b text-center">{user.name}</td>
                  <td className="py-2 px-4 border-b text-center">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.is_admin ? "Admin" : "User"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.is_approved ? "Approved" : "Not Approved"}
                  </td>
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    <button
                      onClick={() =>
                        handleApproveDisapproveUser(user.id, user.is_approved)
                      }
                      className={`py-2 px-4 rounded text-white ${
                        user.is_approved
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.is_approved ? "Disapprove" : "Approve"}
                    </button>

                    <button
                      onClick={() => handleChangeRole(user.id, user.is_admin)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {user.is_admin ? "Make User" : "Make Admin"}
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete
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
