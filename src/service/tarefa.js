import axios from "./axios";


export const addUserToTarefa = (id, usuarios) => {
    return axios.put(`/tarefa/adicionarUser/${id}`, usuarios);
}

export const getTarefas = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}
export const getTarefasWorkspacePorStatus = (id, status) => {
    return axios.get(`tarefa/buscarTarefasStatus/`, {params:{id, status}});
}

//Usado em components/workspace/tarefas/AbaTarefasConcluidasWorkspace
export const getTarefasConclidasWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus/`, {params:{id, status:1}});
}

/*
enum STATUS{
    COMPLETO = 1,
    EM_ANDAMENTO = 2,
    NAO_INICIADO = 3,
    ATRASADO = 4 , 
    AGUARDANDO_VALIDACAO = 5
}
*/



//Usado em components/workspace/tarefas/AbaTarefasAtrasadasWorkspace
export const getTarefasAtrasadasWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus/`, {params:{id, status:4}});
}

//Usado em components/workspace/tarefas/AbaTarefasIniciadasWorkspace
export const getTarefasIniciadasWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus/`, {params:{id, status:2}});
}

//Usado em components/workspace/tarefas/AbaTarefasValidacaoWorkspace
export const getTarefasValidacaoWorkspace = (id) => {
    return axios.get(`tarefa/buscarTarefasStatus/`, {params:{id, status:5}});
}

//Usado em components/objetivos/tarefas/AbaHojeTarefas
export const getTarefasHoje = (id) => {
    return axios.get(`/tarefa/buscarTarefas/${id}`);
}

//Usado em components/objetivos/tarefas/AbaAtrasadasTarefas
export const getTarefasAtrasadas = (id) => {
    return axios.get(`/tarefa/buscarTarefasStatus/`, {params:{id, status:4}});
}

//Usado em components/objetivos/tarefas/AbaConcluidasTarefas
export const getTarefasConclidas = (id) => {
    return axios.get(`/tarefa/buscarTarefasStatus/`, {params:{id, status:1}});
}

export const getTarefasPorStatus = (id, status) => {
    return axios.get(`/tarefa/buscarTarefasStatus/`, {params:{id, status}});
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

export const getTarefaTime = (idTarefa) => {
    return axios.get(`/tarefa/buscarCronometro/${idTarefa}`)
}

export const updateTarefaStatus = (idTarefa, status) => {
    return axios.put(`/tarefa/mudarStatus/${idTarefa}`, {status})
}

export const updateTarefaTime = (idTarefa) => {
    return axios.put(`/tarefa/atualizarCronometro/${idTarefa}`)
}

export const UploadFile = (idTarefa, file, token) => {
    const data = new FormData()
    data.append('file', file)
    return axios.post(`/upload/tarefa/${idTarefa}`, data ,{ headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })
}

export const getTaskStatistics = async ( token) => {
  try {
    const response = await axios.get(`/workspace/buscarEmAndamento/`, { headers: { Authorization: token} });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter estatísticas de tarefas:', error);
    throw error;
  }
};
