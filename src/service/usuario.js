import axios from "./axios";


export const getUserByNameOrEmail = (query, token) => {
    return axios.get(`/usuario/buscarUsuario/${query}`, { headers: { Authorization: token } })
}

export const postUsuarios = (data, token) => {
    return axios.post("/usuario/criar", data, { headers: { Authorization: token } });
}