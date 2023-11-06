import { get, post, del, patch } from "../xhr";

export function getClient(id) {
    return get(`users?role=client&id=${id}`)
}

export function getAllClients(){
    return get("users?role=client");
}

export function createClient(credentials){
    return post("register", {...credentials, role: "client"});
}

export function deleteClient(id) {
    return del('users', id)
}

export function editClient(values, id){
    return patch('users', values, id)
}
