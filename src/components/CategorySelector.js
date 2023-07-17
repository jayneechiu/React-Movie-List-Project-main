import React from "react";
import { CATEGORIES } from "../contants";

export default function CategorySelector(props) {
  const options = Object.values(CATEGORIES);
  return (
    <select
      value={props.category}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
}
