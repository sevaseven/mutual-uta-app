import { fetchConToken } from "../../helpers/fetch";
import { handleErrorApi } from "../../helpers/randoms";
import { types } from "../../types/types";
import { startAlerta } from "../ui/alertas";
import { finishSpinner, startSpinner } from "../ui/spinner";


export const traerTipoDocumentaciones = (idModulo=null) => async (
  dispatch
) => {
  const response = await fetchConToken(idModulo!==null ? `TipoDocumentaciones/porModulo/${idModulo}` : `TipoDocumentaciones`);
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const lista = await response.json();
    if (lista) {
      dispatch({
        type: types.abmTraerTipoDocumentaciones,
        payload: lista
      });
    }
  }

}

export const traerTipoDocumentacionesLegales = () => {  
  return async (dispatch) => {
    try {
      const response = await fetchConToken(`TipoDocumentaciones/Legales`);
      const body = await response.json();

      if (response.ok) {
        dispatch({
          type: types.abmTraerTipoDocumentaciones,
          payload: body,
        });
      } else {
        throw body;
      }
    } catch (error) {
      handleErrorApi(
        dispatch,
        error,
        "Error al obtener documentación legal",
        "Ha ocurrido un error. Intente nuevamente"
      );
    }
  };
}



export const eliminarDocumento = (id) => async (
  dispatch
) => {
  try {
    dispatch(startSpinner());
    const response = await fetchConToken(
      `TipoDocumentaciones/${id}`,
      '',
      "DELETE"
    );
    const body = await response.json()
    if (response.ok) {
      dispatch({
        type: types.abmEliminarTipodocumentacion,
        payload: id
      });
      dispatch(traerTipoDocumentaciones());
      dispatch(finishSpinner());
      dispatch(startAlerta("Tipo de documentación eliminada correctamente", 'success'))
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner())
    if (error.errores && error.errores.mensaje) {
      dispatch(startAlerta(error.errores.mensaje, "error"))
    } else {
      dispatch(startAlerta("Ha ocurrido un error. Intente nuevamente.", "error"))
    }
  }

}



export const agregarTipoDocumento = (tipodocumento) => async (
  dispatch
) => {
  try {
    dispatch(startSpinner());

    let data = {
      idUsuario: 1,
      ...tipodocumento
    }
    const response = await fetchConToken(
      `TipoDocumentaciones`,
      data,
      "POST"
    );
    const body = await response.json()
    if (response.ok) {
      dispatch({
        type: types.abmAgregarTipoDocumentacion,
        payload: body
      });
      dispatch(traerTipoDocumentaciones());
      dispatch(finishSpinner());
      dispatch(startAlerta("Tipo de documentación creada correctamente", 'success'))
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner())
    if (error.errores && error.errores.mensaje) {
      dispatch(startAlerta(error.errores.mensaje, "error"))
    } else {
      dispatch(startAlerta("Ha ocurrido un error. Intente nuevamente.", "error"))
    }
  }
}

export const modificarTipoDocumento = (id, tipoDocumento) => async (
  dispatch
) => {
  try {
    dispatch(startSpinner());
    const response = await fetchConToken(
      `TipoDocumentaciones/${id}`,
      tipoDocumento,
      "PUT"
    );
    const body = await response.json()
    if (response.ok) {
      dispatch(traerTipoDocumentaciones());
      dispatch(finishSpinner());
      dispatch(startAlerta("Tipo de documentación actualizada correctamente", 'success'))
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner())
    if (error.errores && error.errores.mensaje) {
      dispatch(startAlerta(error.errores.mensaje, "error"))
    } else {
      dispatch(startAlerta("Ha ocurrido un error. Intente nuevamente.", "error"))
    }
  }
}


export const buscarDocumento = (text) => dispatch => {
  dispatch({
    type: types.abmBuscarDocumentaciones,
    payload: text
  });

}


