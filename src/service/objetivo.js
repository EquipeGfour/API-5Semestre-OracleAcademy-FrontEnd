import axios from "./axios";


export const getObjetivos = () => {
    return axios.get("/objetivo/buscar");
};

export const postObjetivos = (data) => {
    return axios.post("/objetivo/criar", data);
}

export const deleteObjetivo = (id) => {
    return axios.delete(`/objetivo/deletar/${id}`)
}