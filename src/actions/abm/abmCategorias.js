import { fetchConToken } from "../../helpers/fetch";
import { handleErrorApi } from "../../helpers/randoms";
import { types } from "../../types/types";
import { startAlerta } from "../ui/alertas";
import { finishSpinner, startSpinner } from "../ui/spinner";

export const traerCategorias = () => async (dispatch) => {
  try {
    const response = await fetchConToken(`situacionrevista`);
    const body = await response.json();
    if (response.ok) {
      dispatch({
        type: types.abmTraerCategorias,
        payload: body
      });
    } else {
      throw body
    }
  } catch (error) {
    handleErrorApi(dispatch, error, "Error al cargar las categorias", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const agregarCategoria = (descripcion) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    let data = {
      descripcion_sr: descripcion
    }
    const response = await fetchConToken(
      `SituacionRevista`,
      data,
      "POST"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Categoria creada correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(traerCategorias());
    } else {
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al crear la categoria", "Ha ocurrido un error. Intente nuevamente")
  }
}



export const modificarCategoria = (id, data) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    const response = await fetchConToken(
      `SituacionRevista/${id}`,
      data,
      "PUT"
    );
    const body = await response.json();

    if (response.ok) {
      dispatch(startAlerta("Categoria actualizada correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      dispatch(traerCategorias());
    } else {
      throw body
    }

  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al actualizar la categoria", "Ha ocurrido un error. Intente nuevamente")
  }
}


export const buscarCategoria = (text) => (dispatch) => {
  dispatch({
    type: types.abmBuscarCategoria,
    payload: text
  });
}


