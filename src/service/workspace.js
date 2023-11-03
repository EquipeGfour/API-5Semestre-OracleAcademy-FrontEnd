import axios from "./axios";


export const addUserToWorkspace = (id, usuarios, token) => {
    return axios.put(`/objetivo/adicionarUser/${id}`, usuarios, { headers: { Authorization: token } });
}

export const getWorkspaceUser = (token) => {
    return axios.get(`/workspace/buscar` , { headers: { Authorization: token } });
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
export const getWorkspaceCriados = (token) => {
    return axios.get(`/workspace/buscarWorkspaceProprietario/` ,{ headers: { Authorization: token }});
}

export const editarStatusTarefaWork = (id,idTarefa,data, token) => {
    console.log('editarStatusTarefaWork', id,idTarefa,data, token)
    return axios.put(`/workspace/changestatus/?id=${id}&idTarefa=${idTarefa}`, data, { headers: { Authorization: token } })
}

export const getWorkspaceFinalizados = (token) => {
    return axios.get(`/workspace/buscarWorkspaceUsuario` ,{ headers: { Authorization: token }});
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