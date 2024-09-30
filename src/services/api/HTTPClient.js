import { getAuthUser } from "@/services/firebase/firebaseServices.js";
import axios from "axios";

export class HTTPClient {
  axiosInstance;

  constructor(baseURL) {
    this.axiosInstance = axios.create({ baseURL: baseURL });
  }

  async createHeaders() {
    const token = await getAuthUser()?.getIdToken();
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async post(url, body, config = { fowardError: true }) {
    const headers = await this.createHeaders();
    return await this.axiosInstance.post(url, body, headers);
  }

  async put(url, body, config = { fowardError: true }) {
    const headers = await this.createHeaders();
    return await this.axiosInstance.put(url, body, headers);
  }

  async get(url, params = {}, config = { fowardError: true }) {
    const headers = await this.createHeaders();
    const response = await this.axiosInstance.get(url, {
      headers: headers.headers,
      params: params
    });
    return response;
  }

  async delete(url, config = { fowardError: true }) {
    const headers = await this.createHeaders();
    return await this.axiosInstance.delete(url, headers);
  }

  async patch(url, body, config = { fowardError: true }) {
    const headers = await this.createHeaders();
    return await this.axiosInstance.patch(url, body, headers);
  }
}
