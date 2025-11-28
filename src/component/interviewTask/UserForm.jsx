import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = ({ addUser, updateUser, users = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const user = users.find((u) => u.id === Number(id));
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [isEdit, id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("All Fields Are Required");
      return;
    }

    if (isEdit) {
      updateUser(Number(id), { name, email, phone });
    } else {
      addUser({ name, email, phone });
    }
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isEdit ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />

        {error && <span style={{ color: "red" }}>{error}</span>}

        <button type="submit">{isEdit ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default UserForm;
