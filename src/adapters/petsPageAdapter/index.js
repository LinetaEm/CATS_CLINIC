import { get, post, del, patch } from "../xhr";

export function getAllPets() {
    return get(`pets`)
}

export function getPets(userId){
    return get(`pets?usersId=${userId}`)
}

export function createPet(visit){
    return post('pets', visit)
}

export function deletePet(id) {
    return del('pets', id)
}

export function editPet(values, id) {
    return patch('pets', values, id)
}