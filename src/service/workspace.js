import axios from "./axios";


export const addUserToWorkspace = (id, usuarios, token) => {
    return axios.put(`/objetivo/adicionarUser/${id}`, usuarios, { headers: { Authorization: token } });
}

export const getWorkspaceUser = (token) => {
    return axios.get(`/workspace/buscar` , { headers: { Authorization: token } });
}

export const deleteWork = (id) => {
    return axios.delete(`/objetivo/deletar/${id}`)
}

export const editarWork = (id,data) => {
    return axios.patch(`/objetivo/editar/${id}`, data)
}

export const editarTarefaWork = (idTarefa,data) => {
    return axios.patch(`/tarefa/editar/${idTarefa}`, data)
}