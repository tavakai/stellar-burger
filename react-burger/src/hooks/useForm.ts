import { ChangeEvent, useState } from "react";

export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}