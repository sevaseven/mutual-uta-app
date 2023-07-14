import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { handleErrorApi } from "../../helpers/randoms";
import { startSpinner, finishSpinner } from "../ui/spinner";

export const seccionalesTraerStart = () => ({
  type: types.seccionalesTraerStart,
});

export const seccionalesTraerError = (error) => ({
  type: types.seccionalesTraerError,
  payload: error,
});

export const seccionalesTraerSuccess = (payload) => {
  return {
    type: types.seccionalesTraerSuccess,
    payload: payload,
  };
};

export const seccionalesAltasSuccess = (payload) => {
  return {
    type: types.seccionalesAltasSuccess,
    payload: payload,
  };
};

export const seccionalesAltasDiscaSuccess = (payload) => {
  return {
    type: types.seccionalesAltasDiscaSuccess,
    payload: payload,
  };
};
//contempla la seccional redes sociales
export const traerSeccionales = () => async (dispatch) => {
  try {
    const response = await fetchConToken(`seccionales/SeccionalRS`);
    const body = await response.json();
    if (response.ok) {
        dispatch(seccionalesTraerSuccess(body));
    } else {
      throw body
    }
  } catch (error) {
    handleErrorApi(dispatch, error, "Error al cargar las seccionales", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const fetchSeccionales = () => {
  return async (dispatch) => {
    dispatch(startSpinner());
    dispatch(seccionalesTraerStart());
    const response = await fetchConToken(`seccionales`);
    if (!response.ok) {
      dispatch({
        type: types.seccionalesTraerError,
        payload: response.statusText,
      });
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length > 0) {
        dispatch(seccionalesTraerSuccess(lista));
      }
    }
    dispatch(finishSpinner());
  };
};

export const fetchSeccionalesAltas = (disca) => {
  return async (dispatch) => {
    dispatch(startSpinner());
    dispatch(seccionalesTraerStart());
    const response = await fetchConToken(`Indicadores/CantidadAfiliacionxSeccional?disca=${disca}`);
    if (!response.ok) {
      dispatch({
        type: types.seccionalesTraerError,
        payload: response.statusText,
      });
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length > 0) {
        if(disca)
          dispatch(seccionalesAltasDiscaSuccess(lista));
        else
          dispatch(seccionalesAltasSuccess(lista));
      }
    }
    dispatch(finishSpinner());
  };
};