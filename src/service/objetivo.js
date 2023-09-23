import axios from "./axios";


export const getObjetivos = () => {
    return axios.get("/objetivo/buscar");
};