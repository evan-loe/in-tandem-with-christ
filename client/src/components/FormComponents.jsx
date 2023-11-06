import React from "react";

const FormButton = ({ children, onClick, style, ...props }) => {
  const color = style === "primary" ? "bg-gray-500 text-white" : "";

  return (
    <button {...props} onClick={onClick} className={"w-full p-2 " + color}>
      {children}
    </button>
  );
};

const FormField = ({
  label,
  name,
  type,
  onChange,
  placeholder,
  value,
  className,
  ...props
}) => {
  return (
    <div {...props} className={className ?? "flex flex-col"}>
      <label htmlFor={name}>{label ?? name}</label>
      <input
        className="bg-gray-300 px-4 py-1"
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder ?? label ?? name}
      />
    </div>
  );
};

export { FormButton, FormField };
