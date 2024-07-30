import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useState } from 'react';
import { getAuthUser } from "@/services/firebase/firebaseServices.js";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function useStateAndError() {
  const [state, setState] = useState('');
  const [error, setError] = useState(false);

  return {
    value: state,
    setValue: setState,
    error: error,
    setError: setError,
    change: function(value) {
      setState(value);
      setError(null);
    },
    checkCompletion: function() {
      if (state !== '') {
        return true;
      } else {
        setError(true);
        return false;
      }
    }
  };
}

export const generateAuthorizationHeader = (token) => `Bearer ${token}`;

export const generateHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': generateAuthorizationHeader(
      getAuthUser().stsTokenManager.accessToken
    )
  };
};

export const defaultEventConfig = {
  title: "",
  description: "",
  event_type: "",
  location: "",
  contact: "",
  organized_by: "",
  roles: [],
  tracks: [],
  notification_mails: []
}
