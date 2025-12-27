import React from "react";

const SearchInput = ({ value, onChange, onKeyPress, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className="flex-1 px-4 py-3.5 text-white text-base bg-gray-800/80 border border-gray-600 rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-500 transition-all duration-200 backdrop-blur-sm"
    />
  );
};

export default SearchInput;
