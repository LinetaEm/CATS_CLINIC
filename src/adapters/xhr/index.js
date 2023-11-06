import Axios from "axios";

const host = 'http://localhost:8080/'

function returnAxiosInstance() {
    return Axios.create({
        baseURL: host
        // timeout: 1000,

    });
}

const axios = returnAxiosInstance();
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true


export function get(url) {
    return axios.get(url);
}

export function post(url, requestData) {
    return axios.post(url, requestData);
}

export function del(url, id) {
    return axios.delete(`${url}/${id}`)
}

export function patch(url, data, id) {
    return axios.patch(`${url}/${id}`, data)
}
