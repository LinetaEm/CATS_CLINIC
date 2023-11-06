import { get, post, del, patch } from "../xhr";

export function getAllVisits(){
    return get('visits')
}

export function getClientVisits(userId){
    return get(`visits?usersId=${userId}`)
}

export function createVisit(visit){
    return post('visits', visit)
}

export function deleteVisit(id) {
    return del('visits', id)
}

export function editVisit(values, id) {
    return patch('visits', values, id)
}