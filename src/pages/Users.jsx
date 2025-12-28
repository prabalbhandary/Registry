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

  // Pagination state
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
        toast.error(err.response?.data?.message || "Failed to fetch users");
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
      toast.error(err.response?.data?.message || "Failed to delete user");
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
      toast.error(err.response?.data?.message || "Failed to update user");
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
      toast.error(err.response?.data?.message || "Failed to update role");
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

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-700 to-sky-500 bg-clip-text text-transparent mb-2 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Manage user accounts, roles, and permissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Total Users
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {users.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Approved Users
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {users.filter((u) => u.is_approved).length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Admin Users
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {users.filter((u) => u.is_admin).length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[fadeIn_0.8s_ease-out_0.4s_backwards]">
          {/* Search Section */}
          <div className="bg-gradient-to-r from-cyan-50 to-white p-6 border-b-2 border-cyan-200">
            <div className="relative max-w-md ml-auto">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Content */}
          {filteredUsers.length === 0 ? (
            // Empty State
            <div className="py-20 px-6 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-100 to-sky-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No Users Found
              </h3>
              <p className="text-slate-500 text-lg">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-cyan-100 to-sky-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Admin
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Approved
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-sky-50 transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-500">
                            {(page - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            {user.is_admin ? (
                              <FaUserShield className="text-cyan-600 text-lg" />
                            ) : (
                              <FaUser className="text-slate-400 text-lg" />
                            )}
                            <span className="font-semibold text-slate-800">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {user.email}
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              handleChangeRole(user.id, user.is_admin)
                            }
                            className="transition-transform hover:scale-110"
                          >
                            {user.is_admin ? (
                              <PiToggleRightFill className="text-cyan-500 text-4xl cursor-pointer" />
                            ) : (
                              <PiToggleLeftFill className="text-slate-300 text-4xl cursor-pointer hover:text-slate-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              handleToggle(user.id, user.is_approved)
                            }
                            className="transition-transform hover:scale-110"
                          >
                            {user.is_approved ? (
                              <PiToggleRightFill className="text-green-500 text-4xl cursor-pointer" />
                            ) : (
                              <PiToggleLeftFill className="text-slate-300 text-4xl cursor-pointer hover:text-slate-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <PiTrashFill className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
                {filteredUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-5 shadow-lg border border-cyan-200"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-cyan-200">
                      <div className="flex items-center gap-3">
                        {user.is_admin ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl flex items-center justify-center">
                            <FaUserShield className="text-white text-xl" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center">
                            <FaUser className="text-white text-xl" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">
                            {user.name}
                          </h3>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-sky-500 text-white rounded-lg text-xs font-bold shadow-lg">
                        #{(page - 1) * 10 + index + 1}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Admin Toggle */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-slate-500 block">
                            Admin Role
                          </span>
                          <span className="text-xs text-slate-400">
                            Grant administrative access
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleChangeRole(user.id, user.is_admin)
                          }
                          className="transition-transform hover:scale-110"
                        >
                          {user.is_admin ? (
                            <PiToggleRightFill className="text-cyan-500 text-5xl" />
                          ) : (
                            <PiToggleLeftFill className="text-slate-300 text-5xl" />
                          )}
                        </button>
                      </div>

                      {/* Approval Toggle */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-slate-500 block">
                            Account Approval
                          </span>
                          <span className="text-xs text-slate-400">
                            Approve user account
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleToggle(user.id, user.is_approved)
                          }
                          className="transition-transform hover:scale-110"
                        >
                          {user.is_approved ? (
                            <PiToggleRightFill className="text-green-500 text-5xl" />
                          ) : (
                            <PiToggleLeftFill className="text-slate-300 text-5xl" />
                          )}
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <PiTrashFill className="text-lg" />
                        Delete User
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-cyan-50 to-white px-6 py-5 border-t-2 border-cyan-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-sky-500 hover:text-white hover:border-cyan-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  ← Previous
                </button>

                <span className="text-base font-semibold text-slate-600">
                  Page {page} of {lastPage}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                  disabled={page === lastPage}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-sky-500 hover:text-white hover:border-cyan-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Users;