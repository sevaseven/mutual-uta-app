import { startAlerta } from "./ui/alertas";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { startSpinner, finishSpinner } from "./ui/spinner";
//import { cargarEstadisticas } from "./miOspedyc/estadisticasMiOspedyc";
import { ESTADISTICAS_OSPEDYC } from "../utils/constants";

export const startLogin = (usuario, password, recordar = false, history, loginAfiliado = false, setOpenCambioPassword, setIdUsuario) => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      let resp = null
      if (loginAfiliado) {
        resp = await fetchSinToken(
          "Authenticate/LoginAfiliado",
          { usuario, password },
          "POST"
        );
      } else {
        resp = await fetchSinToken(
          "Authenticate",
          { dni: usuario, password },
          "POST"
        );
      }

      const body = await resp.json();
      if (resp.ok) {
        if (!body.cambioPassword) {
          if (recordar) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
          } else {
            sessionStorage.setItem("token", body.token);
            sessionStorage.setItem("token-init-date", new Date().getTime());
          }

          if (loginAfiliado) {
            dispatch(
              login({
                dni: body.dni,
                idUsuario: body.idUsuarioAfiliado,
                userName: body.userName,
                idAfiliado: body.idAfiliado
              })
            );
            if(recordar)
              localStorage.setItem("es_afiliado", "1")
            else
              sessionStorage.setItem("es_afiliado", "1")
            //dispatch(cargarEstadisticas(ESTADISTICAS_OSPEDYC.INGRESOS_DESKTOP))
            history.push("/afiliado/inicio")
          } else {
            dispatch(
              login({
                dni: body.dni,
                idUsuario: body.idUsuario,
                userName: body.userName,
                imagenPerfil: body.urlImagen,
                areas: body.areasUsuarios,
                idSeccional: body.idSeccional,
                permisos: body.permisos,
                centrosMedicos: body.centrosMedicosUsuario,
                bandejasAutorizacion: body.bandejasAutorizacion,
                subAreasContrataciones: body.subAreasContrataciones,
                areasFisicasUsuario: body.areasFisicasUsuario[0]
              })
            );
            history.push("/")

          }
        } else {
          setIdUsuario(body.idUsuario);
          setOpenCambioPassword(true);
        }
      } else {
        throw body.errores;
      }
      dispatch(finishSpinner());
    } catch (err) {
      console.log(err);
      dispatch(finishSpinner());
      err.mensaje !== undefined ? dispatch(startAlerta(`Verifique`, 'error', err.mensaje)) : dispatch(startAlerta('En caso de persistir el error contacte al administrador', 'error', 'Error de Conexión, intente nuevamente en unos instantes'));
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      let resp = null
      if (sessionStorage.getItem("es_afiliado") || localStorage.getItem("es_afiliado"))
        resp = await fetchConToken("Authenticate/LoginAfiliado");
      else
        resp = await fetchConToken("Authenticate");

      const body = await resp.json();
      if (resp.ok) {
        if (sessionStorage.getItem("es_afiliado") || localStorage.getItem("es_afiliado")) {
            dispatch(
              login({
                dni: body.dni,
                idUsuario: body.idUsuarioAfiliado,
                userName: body.userName,
                idAfiliado: body.idAfiliado
              })
            );
          } else {
            dispatch(
              login({
                dni: body.dni,
                idUsuario: body.idUsuario,
                userName: body.userName,
                imagenPerfil: body.urlImagen,
                areas: body.areasUsuarios,
                idSeccional: body.idSeccional,
                permisos: body.permisos,
                centrosMedicos: body.centrosMedicosUsuario,
                bandejasAutorizacion: body.bandejasAutorizacion,
                subAreasContrataciones: body.subAreasContrataciones,
                areasFisicasUsuario: body.areasFisicasUsuario[0]
              })
            );

          }
      } else {
        throw body.errores;
      }
      dispatch(finishSpinner());
    } catch (err) {
      console.log(err);
      dispatch(finishSpinner());
      dispatch(checkingFinished());
      sessionStorage.setItem("token", "")
      window.location.href = "/auth/login";
      err.mensaje !== undefined ? dispatch(startAlerta(`Verifique`, 'error', err.mensaje)) : dispatch(startAlerta('En caso de persistir el error contacte al administrador', 'error', 'Error de Conexión, intente nuevamente en unos instantes'));
    }
  };
};

const checkingFinished = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = (history, esAfiliado=false) => {
  return (dispatch) => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
    if(esAfiliado){
      history.push("/afiliado/ingreso")
    }else{
      history.push("/auth/login")
    }
  };
};
const logout = () => ({
  type: types.authLogout,
});
