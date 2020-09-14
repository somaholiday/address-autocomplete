import React from "react";

const InputText = (inputConfig) => {
  const { name, label, required, value } = inputConfig;
  return (
    <>
      <label>{label}:</label>
      <input
        type="text"
        {...{ name, value, required }}
        onChange={() => {
          "be quiet";
        }}
      />
    </>
  );
};

export default InputText;
