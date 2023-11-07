import { useContext } from "react";

// ROUTER
import { Outlet, useNavigate } from "react-router-dom";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

// MUI
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PetsIcon from "@mui/icons-material/Pets";
import PeopleIcon from "@mui/icons-material/People";
// LOGO
import logo from "./logo.jpg";

// CSS
import "./Root.css";

export default function Root() {
  const { userState, localLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div id="sidebar">
        <p>Tel. +370 123456</p>
        <p3>Address: I. Kanto str. 100, Kaunas</p3>
        <p>e-mail: info@email.com</p>
        <img src={logo} alt="Logo" />
        <List>
          {!userState && (
            <ListItem onClick={() => navigate("/home")}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          )}

          {userState && (
            <ListItem onClick={() => navigate("/visits")}>
              <ListItemButton>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Visits" />
              </ListItemButton>
            </ListItem>
          )}

          {userState && userState.role === "doctor" && (
            <ListItem onClick={() => navigate("/clients")}>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </ListItemButton>
            </ListItem>
          )}

          {userState && (
            <ListItem onClick={() => navigate("/pets")}>
              <ListItemButton>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary="Pets" />
              </ListItemButton>
            </ListItem>
          )}

          {!userState && (
            <ListItem onClick={() => navigate("/login")}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}

          {!userState && (
            <ListItem onClick={() => navigate("/register")}>
              <ListItemButton>
                <ListItemIcon>
                  <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          )}

          {userState && (
            <ListItem
              onClick={() => {
                navigate("/home");
                localLogout();
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>

      <Outlet />
    </>
  );
}
