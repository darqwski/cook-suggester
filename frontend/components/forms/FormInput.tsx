import React from "react";
import { IFormInput } from "./types";
import { useFormDataContext } from "../../context/form-data-manager/FormDataManager.context";
import WithLabel from "./WitLabel";

const FormInput: React.FC<IFormInput> = ({ label, name, white, ...rest }) => {
  const { setField, formData: { [name]: value = '' } } = useFormDataContext();

  return (
    <WithLabel label={label} white={white}>
      <input name={name} onChange={setField(name)} value={value} {...rest} />
    </WithLabel>
  );
};

export default FormInput;
