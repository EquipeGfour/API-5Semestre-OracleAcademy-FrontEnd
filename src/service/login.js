import axios from "./axios";

export const postLogin = (data, token) => {
    return axios.post(`/login`, data, token);
}