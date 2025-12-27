import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const UserFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useLocalStorage("users", []);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const user = users.find((u) => u.id === id);
      if (user) setFormData(user);
      else navigate("/users");
    }
  }, [id, users, navigate]);

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name required";
    if (!formData.email.trim()) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "Invalid email";
    if (!formData.phone.trim()) err.phone = "Phone required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, "")))
      err.phone = "10 digits required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (id) {
      setUsers(users.map((u) => (u.id === id ? { ...formData, id } : u)));
    } else {
      setUsers([...users, { ...formData, id: Date.now().toString() }]);
    }
    navigate("/users");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "50px auto" }}>
      <h2>{id ? "Edit User" : "Create User"}</h2>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Name *</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        {errors.name && (
          <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Phone *</label>
        <input
          type="tel"
          placeholder="1234567890"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        {errors.phone && (
          <span style={{ color: "red", fontSize: "12px" }}>{errors.phone}</span>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate("/users")}
          style={{ flex: 1, padding: "10px", cursor: "pointer" }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{ flex: 1, padding: "10px", cursor: "pointer" }}
        >
          {id ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default UserFormPage;
