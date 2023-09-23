import axios from "./axios";


export const getTarefas = (id) => {
    return axios.get(`/buscarTarefas/${id}`);
}


export const postTarefa = (id, data) => {
    return axios.post(`/tarefa/criar/${id}`, data)
}