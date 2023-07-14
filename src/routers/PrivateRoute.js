import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { startChecking } from "../actions/auth";
import { validarQueTengaAunqueSeaUnSoloPermiso } from "../helpers/permisos";
import LoadingBeforeViewData from "../components/compartidos/LoadingBeforeViewData";

const { REACT_APP_TOKEN_EXPIRATION_DAYS } = process.env;

export const PrivateRoute = ({ component: Component, permisos, noRestringida, rutaAfiliado, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    const actualDate = new Date();
    if (localStorage.getItem('token')) {
      if(rutaAfiliado && !localStorage.getItem("es_afiliado"))
        history.push("/")
      else if(auth.idUsuario === 0) 
        dispatch(startChecking())
      // if (auth.idUsuario === 0)
      //   dispatch(startChecking());
    } else if(sessionStorage.getItem('token')) {
      if(rutaAfiliado && !sessionStorage.getItem("es_afiliado")) history.push("/")

      const sessionStorageTokenExp = new Date (parseInt(sessionStorage.getItem('token-init-date')));
      sessionStorageTokenExp.setDate(sessionStorageTokenExp.getDate() + parseInt(REACT_APP_TOKEN_EXPIRATION_DAYS));

      if (auth.idUsuario === 0) {
        if(actualDate.getTime() > sessionStorageTokenExp.getTime())
          history.push("/auth/login")
        else
          dispatch(startChecking());
      }
    } else {
      // history.push("/auth/login")
      if(rutaAfiliado) history.push("/afiliado/ingreso")
      else history.push("/auth/login")
    }
    // eslint-disable-next-line
  }, []);
  if (rutaAfiliado && !sessionStorage.getItem("token") && !localStorage.getItem("token")) {
    return <Redirect to="/afiliado/ingreso" />
  }

  if (!sessionStorage.getItem("token") && !localStorage.getItem("token")) {
    return <Redirect to="/auth/login" />
  }

  if (auth.idUsuario === 0) {
    if(sessionStorage.getItem("es_afiliado") || localStorage.getItem("es_afiliado")){
      return <LoadingBeforeViewData />
    }else{
      return <></>
    }
  }

  // if (rutaAfiliado && !sessionStorage.getItem("es_afiliado")) {
  //   return <Redirect to="/" />
  // }

  if (!rutaAfiliado && (sessionStorage.getItem("es_afiliado") || localStorage.getItem("es_afiliado"))){
    return <Redirect to="/afiliado/inicio" />
  }

  if ( permisos && !validarQueTengaAunqueSeaUnSoloPermiso(auth.permisos, [permisos])) {
    return <Redirect to="/" />
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        <Component {...props}></Component>
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
