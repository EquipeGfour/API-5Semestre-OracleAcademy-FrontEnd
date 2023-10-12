import axios from "./axios";


export const addUserToWorkspace = (id, usuarios, token) => {
    return axios.put(`/objetivo/adicionarUser/${id}`, usuarios, { headers: { Authorization: token } });
}

export const getWorkspaceUser = (token) => {
    return axios.get(`/workspace/buscar` , { headers: { Authorization: token } });
}
