import { createContext, useContext } from 'react';
import { IFormDataContext } from './FormDataManager.types';

export const FormDataContext =createContext<IFormDataContext>({
  setField: (name: string) => (event) =>  {
    console.log(name, event);
  },
  addError(error: string): void {
    console.log(error);
  },
  clearErrors(): void {
  },
  errorMessages: [],formData: {},setFormData:(data)=> data,
  clearForm(): void {}
});

export const useFormDataContext = (): IFormDataContext => useContext(FormDataContext);