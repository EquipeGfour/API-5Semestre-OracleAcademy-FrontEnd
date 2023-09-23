import axios from "./axios";


export const getTarefas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}