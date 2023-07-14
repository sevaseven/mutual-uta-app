import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { finishSpinner, startSpinner } from "../ui/spinner";
import { handleErrorApi } from "../../helpers/randoms";
import { startAlerta } from "../ui/alertas";

const urlBase = process.env.REACT_APP_URL

export const agregarTipoAfiliacion = (descripcion) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    let data = {
      descripcion,
    }

    const response = await fetchConToken(
      `TipoAfiliaciones`,
      data,
      "POST"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Tipo afiliaciòn creada correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(traerAfiliaciones());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al crear", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const modificarTipoAfiliacion = (id, data) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    const response = await fetchConToken(
      `TipoAfiliaciones/${id}`,
      data,
      "PUT"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Tipo afiliaciòn actualizada correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(traerAfiliaciones());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al actualizar", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const traerAfiliaciones = () => async (dispatch) => {
  try {
    const response = await fetchConToken(`TipoAfiliaciones`);
    const body = await response.json();

    if (response.ok) {
      dispatch({
        type: types.abmTraerAfiliaciones,
        payload: body
      });
    } else {
      throw body
    }
  } catch (error) {
    handleErrorApi(dispatch, error, "Error al traer los tipos de afiliaciones", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const traerAfiliacionesAutogestion = () => async (
  dispatch, getState
) => {
  const state = getState();
  const { usuarioAutogestion } = state.userAutogestion;
  fetch(`${urlBase}/api/TipoAfiliaciones`, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + usuarioAutogestion.token } })
    .then(res => res.json())
    .then(res => {
      if (res.status !== 401) {
        dispatch({
          type: types.abmTraerAfiliaciones,
          payload: res
        });
      } else {

      }
    })
}

export const buscarAfiliado = (text) => dispatch => {
  dispatch({
    type: types.abmBuscarAfiliado,
    payload: text
  });
}
