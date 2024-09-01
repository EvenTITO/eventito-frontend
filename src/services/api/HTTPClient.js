import { getAuthUser } from "@/services/firebase/firebaseServices.js";
import { serverDown } from "@/state/app/appSlice";
import axios from "axios";

export class HTTPClient {
  axiosInstance;

  constructor(baseURL) {
    this.axiosInstance = axios.create({ baseURL: baseURL });
  }

  createHeaders() {
    // TODO: the token should update itself, I think this is asyn.
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthUser().stsTokenManager.accessToken}`,
      },
    };
  }

  async post(url, body, config = { fowardError: true }) {
    const headers = this.createHeaders();
    return await this.axiosInstance.post(url, body, headers);
  }

  async get(url, config = { fowardError: true }) {
    const headers = this.createHeaders();
    return await this.axiosInstance.get(url, headers);
  }
}
