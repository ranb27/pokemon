import React from "react";

export default function Select({
  options,
  value,
  setValue,
}: {
  options: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="select select-warning w-full"
    >
      <option value="" disabled>
        Pick your Pokemon
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
