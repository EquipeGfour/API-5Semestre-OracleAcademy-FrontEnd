import axios from "./axios";


export const addUserToTarefa = (id, usuarios) => {
    return axios.put(`/tarefa/adicionarUser/${id}`, usuarios);
}

export const getTarefas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}

export const getTarefaById = (id) => {
    return axios.get(`/tarefa/buscarTarefa/${id}`);
}


export const postTarefa = (id, data) => {
    return axios.post(`/tarefa/criar/${id}`, data);
}


export const deleteTarefa = (idTarefa) => {
    return axios.delete(`/tarefa/deletar/${idTarefa}`)
}