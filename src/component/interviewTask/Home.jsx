import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <button onClick={() => navigate("/users")}>Go To User</button>
    </div>
  );
};

export default Home;
