import axios from "./axios";


export const getObjetivos = (token) => {
    return axios.get("/objetivo/buscar", { headers: { Authorization: token } });
};

export const getObjetivosConcluidos = (token) => {
    return axios.get("/objetivo/buscar", { headers: { Authorization: token }, params:{status: 1} });
};
/*
enum STATUS{
    COMPLETO = 1,
    EM_ANDAMENTO = 2,
    NAO_INICIADO = 3,
    ATRASADO = 4 , 
    AGUARDANDO_VALIDACAO = 5
}
*/
export const postObjetivos = (data,token) => {
    return axios.post("/objetivo/criar", data,{ headers: { Authorization: token } });
}


export const deleteObjetivo = (id) => {
    return axios.delete(`/objetivo/deletar/${id}`)
}

export const editObjetivo = (id, objetivo) => {
    return axios.patch(`/objetivo/editar/${id}`, objetivo)
}
