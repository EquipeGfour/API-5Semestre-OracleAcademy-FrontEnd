import axios from "./axios";

export const getDadosGraficoByMonthWork = (data,token) => {
    return axios.get(`workspace/buscarWorkspaceByMonth?date=${data}`, {headers: {Authorization: token}});
}

export const getDadosGraficoByMonthObj = (data,token) => {
    return axios.get(`objetivo/buscarPorData?date=${data}`, {headers: {Authorization: token}});
}