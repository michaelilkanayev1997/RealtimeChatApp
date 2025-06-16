import axios from "axios";

import { HOST } from "@/utils/constants.js";

export const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});
