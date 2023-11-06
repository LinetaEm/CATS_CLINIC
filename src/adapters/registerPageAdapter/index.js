import { post } from "../xhr";

export function registerClient(credentials){
    return post("register", {...credentials, role: "client"});
}

export function registerDoctor(credentials){
    return post("register", {...credentials, role: "doctor"})
}

export function registerVisit(visitDetails) {
    return post("visits", visitDetails)
}
  
