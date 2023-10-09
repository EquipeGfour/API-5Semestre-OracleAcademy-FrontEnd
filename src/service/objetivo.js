import axios from "./axios";


export const getObjetivos = () => {
    return axios.get("/objetivo/buscar");
};

export const postObjetivos = (data,token) => {
    return axios.post("/objetivo/criar", data,{ headers: { Authorization: token } });
}

export const deleteObjetivo = (id) => {
    return axios.delete(`/objetivo/deletar/${id}`,{ headers: { Authorization: token } })
}