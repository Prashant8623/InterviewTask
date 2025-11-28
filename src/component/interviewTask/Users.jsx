import React from "react";
import { useNavigate } from "react-router-dom";

const Users = ({ users, deleteUser }) => {
  const navigate = useNavigate();

  if (users.length > 0) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={{ alignItems: "right" }}>
          <button onClick={() => navigate("/users/new")}> Create New</button>
        </div>

        <table style={{ border: "1px", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <button onClick={() => navigate(`/users/${user.id}/edit`)}>
                  Edit
                </button>
                <button onClick={() => navigate(`/users/${user.id}`)}>
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <button onClick={() => navigate(`/users/new`)}> Craete User</button>
    </div>
  );
};

export default Users;
