import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useState } from 'react';
import { getAuthUser } from "@/services/firebase/firebaseServices.js";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function useStateAndError(name) {
  const [state, setState] = useState('');
  const [error, setError] = useState(false);

  return {
    [`${name}`]: state,
    [`set${name.charAt(0).toUpperCase() + name.slice(1)}`]: setState,
    [`${name}Error`]: error,
    [`set${name.charAt(0).toUpperCase() + name.slice(1)}Error`]: setError,
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
