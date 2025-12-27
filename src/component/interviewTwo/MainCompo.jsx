import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import UsersPage from "./UsersPage";
import UserFormPage from "./UserFormPage";
import HomePage from "./Home";

const MainCompo = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/create" element={<UserFormPage />} />
      <Route path="/users/edit/:id" element={<UserFormPage />} />
    </Routes>
  );
};

export default MainCompo;
