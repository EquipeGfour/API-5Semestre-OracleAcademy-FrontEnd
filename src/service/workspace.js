import axios from "./axios";


export const addUserToWorkspace = (id, usuarios, token) => {
    return axios.put(`/objetivo/adicionarUser/${id}`, usuarios, { headers: { Authorization: token } });
}