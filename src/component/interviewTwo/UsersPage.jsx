import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useLocalStorage("users", []);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const perPage = 5;

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayUsers = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Create Button */}
      <div
        style={{
          display: "flex",
          justifyContent: users.length === 0 ? "center" : "flex-end",
          minHeight: users.length === 0 ? "80vh" : "auto",
          alignItems: users.length === 0 ? "center" : "flex-start",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate("/users/create")}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Create User
        </button>
      </div>

      {/* Search and Table */}
      {users.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />

          {filtered.length > 0 ? (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        background: "#68a4e0ff",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        background: "#e685eeff",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        background: "#e48e8eff",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        background: "#73d388ff",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((user) => (
                    <tr key={user.id}>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {user.name}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {user.email}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {user.phone}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <button
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                          style={{ marginRight: "5px", cursor: "pointer" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(user.id)}
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "20px",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                    style={{ cursor: "pointer" }}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                    style={{ cursor: "pointer" }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No users found.</p>
          )}
        </>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "400px",
            }}
          >
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this user?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{ flex: 1, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{ flex: 1, cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
