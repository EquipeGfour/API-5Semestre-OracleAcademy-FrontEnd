import axios from "./axios";


export const getTarefas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}


export const postTarefa = (id, data) => {
    return axios.post(`/tarefa/criar/${id}`, data);
}


export const deleteTarefa = (idTarefa) => {
    return axios.delete(`/tarefa/deletar/${idTarefa}`)
}