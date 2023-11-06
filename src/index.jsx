import * as React from "react";
import * as ReactDOM from "react-dom/client";


// ROUTER DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// PAGES
import Root from "./layout/Root";
import Error from "./pages/Error";
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/Home";
import Clients from './pages/Clients'
import Visits from "./pages/Visits";
import Pets from './pages/Pets'

// HOOKS
import { useAuth } from "./hooks/useAuth"

// CONTEXT
import { AuthContext } from "./context/AuthContext";

// MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// CSS
import "./index.css"


const App = () => {
  const { localLogin, localLogout, userState, setUserState } = useAuth();

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        { path: "visits", element: <Visits /> },
        { path: "visits/:usersId", element: <Visits /> },
        { path: "pets", element: <Pets /> },
        {path: "pets/:usersId/:petsId?", element: <Pets/>},
        { path: "clients", element: <Clients /> },
        { path: "clients/:usersId", element: <Clients /> },
      ],
    },
  ]);

  return (
    <AuthContext.Provider value={{ localLogin, localLogout, userState, setUserState }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
