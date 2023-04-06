import axios from "axios";
import { BASE_URL_USERS_REPORTING } from "../config/urls";

export const axiosUserService = axios.create({
    baseURL: `${BASE_URL_USERS_REPORTING}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
    method: "post",
});