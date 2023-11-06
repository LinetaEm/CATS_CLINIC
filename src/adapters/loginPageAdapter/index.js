import { post } from "../xhr";

export function clientLogin(credentials){
    return post("login", credentials);
}
  
export function doctorLogin(credentials){
    return post("login", credentials);
}