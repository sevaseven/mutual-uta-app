import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { finishSpinner, startSpinner } from "../ui/spinner";
import { startAlerta } from "../ui/alertas";
import { handleErrorApi } from "../../helpers/randoms";

export const fetchEstadosCiviles = () => async (dispatch) => {
  try {
    dispatch({ type: types.abmTraerEstadosCivilesStart });
    const response = await fetchConToken(`EstadoCivil`);
    const body = await response.json();
    if (response.ok) {
      dispatch({
        type: types.abmTraerEstadosCivilesSuccess,
        payload: body
      })
    } else {
      throw body
    }
  } catch (error) {
    dispatch({ type: types.abmTraerEstadosCivilesError });
    handleErrorApi(dispatch, error, "Error al traer los estados civil", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const buscarEstadoCivil = (text) => dispatch => {
  dispatch({
    type: types.abmBuscarEstados,
    payload: text
  });
}

export const modificarEstadoCivil = (data) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    const response = await fetchConToken(
      `EstadoCivil/${data.idEstadoCivil}`,
      data,
      "PUT"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Estado Civil actualizado correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(fetchEstadosCiviles());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al actualizar", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const agregarEstadoCivil = (descripcion) => async (dispatch) => {
  try {
    dispatch(startSpinner());
    let data = {
      descripcionEstado: descripcion
    }
    const response = await fetchConToken(
      `EstadoCivil`,
      data,
      "POST"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Estado Civil creado correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(fetchEstadosCiviles());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al crear", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const eliminarEstadoCivil = (id) => async (dispatch) => {
  try {
    dispatch(startSpinner());
    const response = await fetchConToken(
      `EstadoCivil/${id}`,
      {},
      "DELETE"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Estado Civil eliminado correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(fetchEstadosCiviles());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al eliminar", "Ha ocurrido un error. Intente nuevamente")
  }
}