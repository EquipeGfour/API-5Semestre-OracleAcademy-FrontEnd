import axios from "./axios";


export const addUserToTarefa = (id, usuarios) => {
    return axios.put(`/tarefa/adicionarUser/${id}`, usuarios);
}

export const getTarefas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}

//Usado em components/workspace/tarefas/AbaTarefasConcluidasWorkspace
export const getTarefasConclidasWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus`);
}

//Usado em components/workspace/tarefas/AbaTarefasAtrasadasWorkspace
export const getTarefasAtrasadasWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus`);
}

//Usado em components/workspace/tarefas/AbaTarefasIniciadasWorkspace
export const getTarefasIniciadasWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus`);
}

//Usado em components/workspace/tarefas/AbaTarefasValidacaoWorkspace
export const getTarefasValidacaoWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus`);
}

//Usado em components/objetivos/tarefas/AbaHojeTarefas
export const getTarefasHoje = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}

//Usado em components/objetivos/tarefas/AbaAtrasadasTarefas
export const getTarefasAtrasadas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}

//Usado em components/objetivos/tarefas/AbaConcluidasTarefas
export const getTarefasConclidas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}

export const getTarefaById = (id, status) => {
    return axios.get(`/tarefa/buscarTarefa/${id}`);
}


export const postTarefa = (id, data) => {
    return axios.post(`/tarefa/criar/${id}`, data);
}


export const deleteTarefa = (idTarefa) => {
    return axios.delete(`/tarefa/deletar/${idTarefa}`)
}

export const editTarefa = (idTarefa, tarefaEdited) => {
    return axios.patch(`/tarefa/editar/${idTarefa}`, tarefaEdited)
}