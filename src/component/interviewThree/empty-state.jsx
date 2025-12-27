import React from "react";
const EmptyState = ({ message }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">🔍</div>
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

export default EmptyState;
