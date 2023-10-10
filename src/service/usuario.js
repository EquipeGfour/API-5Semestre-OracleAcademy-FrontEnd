import axios from "./axios";


export const postUsuarios = (data, token) => {
    return axios.post("/usuario/criar", data, { headers: { Authorization: token } });
}