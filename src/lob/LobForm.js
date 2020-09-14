import React from "react";
import InputText from "./InputText";
import InputAutocomplete from "./InputAutocomplete";

// TODO: use TypeScript to validate input config schema
const formConfig = [
  {
    name: "description",
    label: "Description",
  },
  {
    name: "to",
    label: "To",
    required: true,
    type: "autocomplete",
  },
  {
    name: "from",
    label: "From",
    type: "autocomplete",
  },
  {
    name: "front",
    label: "Front",
    required: true,
    value: "https://s3-us-west-2.amazonaws.com/lob-assets/4x6_pc_front_ex.pdf",
  },
  {
    name: "back",
    label: "Back",
    required: true,
    value: "https://s3-us-west-2.amazonaws.com/lob-assets/4x6_pc_back_ex.pdf",
  },
];

function getInputComponent(inputConfig) {
  switch (inputConfig.type) {
    case "autocomplete":
      return InputAutocomplete;
    case "text":
    default:
      return InputText;
  }
}

function LobForm() {
  const inputFields = formConfig.map((inputConfig) => {
    const InputComponent = getInputComponent(inputConfig);
    return (
      <div key={inputConfig.name} className="form-group">
        <InputComponent {...inputConfig} />
      </div>
    );
  });

  return (
    <div>
      <form>
        {inputFields}
        <input className="btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LobForm;
