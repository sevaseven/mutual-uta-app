import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { finishSpinner, startSpinner } from "../ui/spinner";
import { handleErrorApi } from '../../helpers/randoms';
import { startAlerta } from "../ui/alertas"

export const fetchParentescos = () => async (dispatch) => {
  try {
    dispatch({ type: types.abmTraerTipoParentescosStart });
    const response = await fetchConToken(`Parentescos`);
    const body = await response.json();
    if (response.ok) {
      dispatch({
        type: types.abmTraerTipoParentescosSuccess,
        payload: body
      })
    } else {
      throw body
    }
  } catch (error) {
    dispatch({ type: types.abmTraerTipoParentescosError });
    handleErrorApi(dispatch, error, "Error al traer los parentescos", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const agregarParentesco = (descripcion) => async (dispatch) => {
  try {
    dispatch(startSpinner());
    let data = {
      descripcion: descripcion
    }
    const response = await fetchConToken(
      `Parentescos`,
      data,
      "POST"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Parentesco creado correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(fetchParentescos());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al crear", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const modificarParentesco = (data) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    const response = await fetchConToken(
      `Parentescos/${data.idParentesco}`,
      data,
      "PUT"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Parentesco actualizado correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(fetchParentescos());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al actualizar", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const buscarParentesco = (text) => dispatch => {
  dispatch({
    type: types.abmBuscarParentescos,
    payload: text
  });
}