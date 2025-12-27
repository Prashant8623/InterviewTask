import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
    <p className="text-red-700 font-medium">{message}</p>
  </div>
);

export default ErrorMessage;
