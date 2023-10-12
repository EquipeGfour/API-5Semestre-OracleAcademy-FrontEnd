import axios from "./axios";


export const getObjetivos = (token) => {
    return axios.get("/objetivo/buscar", { headers: { Authorization: token } });
};

export const postObjetivos = (data,token) => {
    return axios.post("/objetivo/criar", data,{ headers: { Authorization: token } });
}

export const deleteObjetivo = (id) => {
    return axios.delete(`/objetivo/deletar/${id}`)
}