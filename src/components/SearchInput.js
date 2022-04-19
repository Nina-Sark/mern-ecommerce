import React from "react";

export const SearchInput = ({ onChange, value, className, placeholder, ...props }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      data-element="search-input"
      className="w-[98%] h-12 outline-none bg-pink-500 cursor-pointer focus-within:bg-pink-400 hover:bg-pink-400 transition rounded-full px-5 placeholder-gray-300 text-white"
      placeholder={placeholder}
      {...props}
    />
  );
};
