import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { startAlerta } from "./ui/alertas";

export const notificacionTraerNotificacionStart = () => ({ type: types.notificacionTraerNotificacionStart });
export const notificacionTraerNotificacionLimpiar = () => ({ type: types.notificacionTraerNotificacionLimpiar });
export const notificacionTraerNotificacionError = (error) => ({ type: types.notificacionTraerNotificacionError,payload: error});
export const notificacionTraerNotificacionSuccess = (payload) => {
    return {
        type: types.notificacionTraerNotificacionSuccess,
        payload: payload
    }
}

export const fetchNotificacionesPorArea = (idArea) => {
    return async (dispatch) => {
        dispatch(notificacionTraerNotificacionStart());
        const response = await fetchConToken(`Notificaciones/traerPorArea/${idArea}`);
        if (!response.ok) {
            dispatch(notificacionTraerNotificacionError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();
            if (lista.length>0) {
                dispatch( notificacionTraerNotificacionSuccess(lista) );
            }
          }
    };
};

export const fetchNotificacionesPorUsuario = (idUsuario) => {
  return async (dispatch) => {
      try{
        dispatch(notificacionTraerNotificacionStart());
        const response = await fetchConToken(`Notificaciones/traerPorUsuario/${idUsuario}` );
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const lista = await response.json();
          if (response.status !== 200) throw lista.errores;
          dispatch( notificacionTraerNotificacionSuccess(lista) );
        }
      } catch (err){
        console.log( err );
        dispatch(startAlerta('Ha ocurrido un error al cargar las notificaciones', "warning", `¡Error!`));
      }
  };
};

export const agregarNotificacion = (idGrupoFamiliar, estado, idBandejaOrigen, idBandejaDestino, observacion, idAfiliado, mensaje) => async (
  ) => {
    const objEnvio =  { idGrupoFamiliar, estado, idBandejaOrigen, idBandejaDestino, observacion, idAfiliado, mensaje}
    const response = await fetchConToken(
      `Notificaciones`,
      objEnvio,
      "POST"
    );
    if (!response.ok) {
      console.log('respuesta log',response.statusText);
    }
}
export const modificarNotificacion = (idBeneficiariosLog) => async () => {
    const response = await fetchConToken(
      `Notificaciones`,
      { idBeneficiariosLog },
      "PUT"
    );
    if (!response.ok) {
      console.log('respuesta log',response.statusText);
    }
}



export const notificacionesFitrado = (mensajesSerializados, areasUsuario) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { idSeccional } = state.auth;
    const mensajes = JSON.parse(mensajesSerializados);
    const areasIds = areasUsuario.map( s => s.idArea);
    const mensajesFiltrados = areasIds.includes(1) ? mensajes.filter( s => areasIds.includes(s.idBandejaDestino) && /* s.afiliado.domiciliosAfiliados.id_seccional */ s.afiliado.id_sec === idSeccional) : mensajes.filter( s => areasIds.includes(s.idBandejaDestino));

    dispatch( notificacionTraerNotificacionSuccess(mensajesFiltrados) );
  };
};

