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
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  /* =============================
     FETCH USERS (PAGINATED)
  ============================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${URL}/user?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data?.data || []);
      setLastPage(res.data?.meta?.last_page || 1);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(
          err.response?.data?.message || "Failed to fetch users"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  /* =============================
     DELETE USER
  ============================= */
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

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  };

  /* =============================
     TOGGLE APPROVAL
  ============================= */
  const handleToggle = async (id, is_approved) => {
    try {
      await axios.get(`${URL}/approve-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { is_approved: !is_approved },
      });

      toast.success("User updated");
      fetchUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update user"
      );
    }
  };

  /* =============================
     TOGGLE ROLE
  ============================= */
  const handleChangeRole = async (id, is_admin) => {
    try {
      await axios.put(
        `${URL}/user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { is_admin: !is_admin },
        }
      );

      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update role"
      );
    }
  };

  /* =============================
     SEARCH (CURRENT PAGE ONLY)
  ============================= */
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <Loader />;

  return (
    <>
      <title>Users - Trauma Registry</title>

      {/* Search */}
      <div className="p-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No users found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto p-4">
            <table className="min-w-full bg-white border rounded shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  {["#", "Username", "Email", "Admin", "Approved", "Actions"].map(
                    (h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>

                    <td className="px-4 py-3">
                      {user.is_admin ? (
                        <PiToggleRightFill
                          className="text-green-500 text-3xl cursor-pointer"
                          onClick={() =>
                            handleChangeRole(user.id, user.is_admin)
                          }
                        />
                      ) : (
                        <PiToggleLeftFill
                          className="text-gray-400 text-3xl cursor-pointer"
                          onClick={() =>
                            handleChangeRole(user.id, user.is_admin)
                          }
                        />
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {user.is_approved ? (
                        <PiToggleRightFill
                          className="text-green-500 text-3xl cursor-pointer"
                          onClick={() =>
                            handleToggle(user.id, user.is_approved)
                          }
                        />
                      ) : (
                        <PiToggleLeftFill
                          className="text-gray-400 text-3xl cursor-pointer"
                          onClick={() =>
                            handleToggle(user.id, user.is_approved)
                          }
                        />
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded"
                      >
                        <PiTrashFill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 pb-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {page} of {lastPage}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
              disabled={page === lastPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Users;
