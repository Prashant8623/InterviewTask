import React, { useState } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import UserForm from "./UserForm";

const Main = () => {
  const [users, setUser] = useState([]);

  const addUser = (user) => {
    setUser([...users, { id: Date.now(), ...user }]);
  };

  const updateUser = (id, updateUser) => {
    setUser(users.map((u) => (u.id === id ? { ...u, ...updateUser } : u)));
  };

  const deleteUser = (id) => {
    setUser(users.filter((u) => u.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/users"
        element={<Users users={users} deleteUser={deleteUser} />}
      />
      <Route path="/users/new" element={<UserForm />} addUser={addUser} />

      <Route
        path="/users/:id/edit"
        element={<UserForm users={users} updateUser={updateUser} />}
      />
    </Routes>
  );

  //   const routes = useRoutes([
  //     { path: "/", element: <Home /> },
  //     {
  //       path: "/users",
  //       element: <Users users={users} deleteUser={deleteUser} />,
  //     },
  //     { path: "/users/new", element: <UserForm addUser={addUser} /> },
  //     {
  //       path: "/users/:id/edit",
  //       element: <UserForm users={users} updateUser={updateUser} />,
  //     },
  //   ]);
  //   return routes;
};

export default Main;

