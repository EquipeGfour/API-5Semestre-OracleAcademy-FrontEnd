import axios from "./axios";


export const getTarefas = (id) => {
    return axios.get(`/buscarTarefas/${id}`);
}