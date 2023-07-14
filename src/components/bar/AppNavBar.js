import React from "react";
import { AppBar } from "@material-ui/core";
import { useSelector } from "react-redux";
import BarSesion from "./BarSesion";
import BarSesionDefault from "./BarDefault";
import { useLocation } from "react-router-dom";
const AppNavbar = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
 // console.log(location.pathname);
  return auth ? (
    !!auth.idUsuario && location.pathname !== '/totem' ? (
      <AppBar position="static">
         {location.pathname === "/" ? <BarSesionDefault /> : <BarSesion />} 
       
      </AppBar>
    ) : null
  ) : null;
};

export default AppNavbar;
