import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: object = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false
};

export const notifySuccess = (text: string): ReactNode => toast.success(text, toastOptions);

export const notifyError = (text?: string): ReactNode => {
  return (toast.error(text ?? 'An error occurred', toastOptions));
};

export const notifyWarning = (text: string): ReactNode => toast.warning(text, toastOptions);
