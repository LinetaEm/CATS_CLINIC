import { useEffect, useState } from "react";

// HOOKS
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {

  const [userState, setUserState] = useState(null);


  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      setUserState(JSON.parse(user));
    }
  }, []);

  const localLogin = (user) => {
    setUserState(user)
    setItem("user", JSON.stringify(user));
  };

  const localLogout = () => {
    setUserState(null)
    setItem("user", "");
  };

  return { userState,  localLogin, localLogout, setUserState };
};