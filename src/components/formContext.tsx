'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormDataContextProps {
  formData: FormData;
  updateFormData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleStatus: (state: string, value: boolean) => void;
  success: boolean;
  error: boolean;
  clearState: () => void;
  emailTouched: boolean;
  setEmailTouched: (value: boolean) => void;
}



const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);
interface FormDataProviderProps {
  children: ReactNode;
}
export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  function updateFormData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.preventDefault();
    if (e.target.name === 'file-upload') {

    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function clearState() {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
  }

  function handleStatus(state: string, value: boolean) {
    if (state === 'success') {
      setSuccess(value);
    } else {
      setError(value);
    }
  }

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, handleStatus, clearState, setEmailTouched, emailTouched, success, error }}>
      {children}
    </FormDataContext.Provider>
  );
};

export function useFormData() {
  const context = useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
}