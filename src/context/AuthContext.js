import { createContext } from "react";


export const AuthContext = createContext({
  localLogin: () => {},
  userState: null,
  setUserState: () => {},
});