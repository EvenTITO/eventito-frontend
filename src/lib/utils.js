import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {getAuthUser} from "@/services/firebase/firebaseServices.js";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
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
