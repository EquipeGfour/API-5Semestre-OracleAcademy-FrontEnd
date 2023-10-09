import axios from "./axios";

export const postLogin = (data) => {
    return axios.post(`/login`, data);
}