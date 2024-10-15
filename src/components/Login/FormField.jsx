import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const FormField = ({htmlFor, label, id, type, placeholder, value, setValue}) => {
  return (
    <>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default FormField;
