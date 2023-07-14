import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { startSpinner, finishSpinner } from "../ui/spinner";
import { handleErrorApi } from "../../helpers/randoms";
import { startAlerta } from "../ui/alertas";

export const fetchEspecialidades = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch({type: types.abmEspecialidadTraerStart});
      const response = await fetchConToken(`Especialidades`);
      const body = await response.json();

      if (response.ok) {
        dispatch({
          type: types.abmEspecialidadTraerSuccess,
          payload: body
        });
        dispatch(finishSpinner());
      }else{
        throw body
      }

    } catch (error) {
      handleErrorApi(dispatch, error, "Error al traer las especialidades", "Ha ocurrido un error. Intente nuevamente")
      dispatch({type: types.abmEspecialidadTraerError});
      dispatch(finishSpinner());
    }
  };
};

export const buscarEspecialidad = (text) => dispatch => {
  dispatch({
    type: types.abmEspecialidadBuscar,
    payload: text
  });
}

export const modificarEspecialidad = (body, callback) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    const response = await fetchConToken(`Especialidades/${body.idEspecialidades}`, body, "PUT");
    await response.json();

    if (response.ok) {
      dispatch(startAlerta("Especialidad modificada correctamente", 'success', 'Comando Exitoso'));
      dispatch(fetchEspecialidades());
      dispatch(finishSpinner());
      callback&& callback();
    }else{
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al modificar la especialidad", "Ha ocurrido un error. Intente nuevamente")
  }
};

export const eliminarEspecialidad = (id) => async (dispatch) => {
  try {
    dispatch(startSpinner());
    const response = await fetchConToken(`Especialidades/${id}`, '', "DELETE");
    const body=await response.json();

    if (response.ok) {
      dispatch(startAlerta("Especialidad eliminada", 'success', 'Comando Exitoso'));
      dispatch(fetchEspecialidades());
      dispatch(finishSpinner());
    }else{
      throw body
    }

  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al eliminar la especialidad", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const agregarEspecialidad = (item, callback) => async (dispatch) => {
  try {
    dispatch(startSpinner());

    const response = await fetchConToken(`Especialidades`, item, "POST");
    const body=await response.json();
    
    if (response.ok) {
      dispatch(fetchEspecialidades())
      dispatch(startAlerta("Especialidad creada correctamente", 'success', 'Comando Exitoso'))
      dispatch(finishSpinner());
      callback&& callback();
    }else{
      throw body
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al cargar la especialidad", "Ha ocurrido un error. Intente nuevamente")
  }
}
