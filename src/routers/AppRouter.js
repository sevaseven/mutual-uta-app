import React from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import theme from "../Theme/theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Alertas } from "../components/ui/Alertas";
import Spinner from "../components/ui/BackDrop";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { HomeScreen } from "../components/Home/HomeScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import CambioContraseñaUsuario from "../components/auth/CambioContraseñaUsuario";
import AppNavbar from "../components/bar/AppNavBar";
import { HomeUsuarios } from "../components/configuracion/usuarios/HomeUsuarios";
import { HomeRoles } from "../components/configuracion/roles/HomeRoles";
import HomePermisos from "../components/configuracion/permisos/HomePermisos";
import {
  PERMISOS_PERMISOS,
  ROLES_PERMISOS,
  USUARIOS_PERMISOS,
} from "../utils/permisos";
import themeTotem from "../Theme/themeTotem";
import { useSelector } from "react-redux";

export const AppRouter = () => {
  const location = useLocation();
  
  const esUsuarioTotem = useSelector(
    (state) =>
      state.auth?.areas?.filter(
        (area) => area.idArea === AREAS_USUARIOS.TOTEM
      ).length > 0
  );

  return (
    <MuiThemeProvider theme={location.pathname !== "/totem" ? theme : themeTotem}>
      <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
        <CssBaseline />
        <Alertas />
        <Spinner />
        <div>
          {!esUsuarioTotem && <AppNavbar />}
          <Switch>
            <PublicRoute path="/auth/login" component={LoginScreen} />
            
            <PrivateRoute exact path="/" component={HomeScreen} />

            <PrivateRoute
              exact
              path="/usuarios/usuario"
              component={HomeUsuarios}
              permisos={USUARIOS_PERMISOS}
            />
            <PrivateRoute
              exact
              path="/usuarios/roles"
              component={HomeRoles}
              permisos={ROLES_PERMISOS}
            />
            <PrivateRoute
              exact
              path="/usuarios/permisos"
              component={HomePermisos}
              permisos={PERMISOS_PERMISOS}
            />
            <PrivateRoute
              exact
              path="/cambio-contraseña"
              component={CambioContraseñaUsuario}
            />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};
