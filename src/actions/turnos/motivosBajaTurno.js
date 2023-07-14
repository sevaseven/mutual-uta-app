import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { startAlerta } from "../ui/alertas";
///import { spinner, spinnerClose } from '../helpers/spinners';
import { startSpinner,finishSpinner } from "../ui/spinner";

export const motivosBajaTurnoTraerStart = () => ({ type: types.motivosBajaTurnoTraerStart });
export const motivosBajaTurnoLimpiar = () => ({ type: types.motivosBajaTurnoLimpiar });
export const motivosBajaTurnoTraerError = (error) => ({ type: types.motivosBajaTurnoTraerError,payload: error});
export const motivosBajaTurnoTraerSuccess = (payload) => {
  return {
    type: types.motivosBajaTurnoTraerSuccess,
    payload: payload
  }
}

export const fetchMotivosBajaTurno = () => {
    return async (dispatch) => {
      try{
        dispatch(startSpinner());
        dispatch(motivosBajaTurnoTraerStart());
        const response = await fetchConToken(`MotivosdeBajaTurno`);
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const lista = await response.json();
          if (response.status !== 200) throw lista.errores;
          dispatch(motivosBajaTurnoTraerSuccess(lista));
        }
        dispatch(finishSpinner());
      } catch (err){
        dispatch(finishSpinner());
        dispatch(startAlerta(err, "warning", `¡Error!`));
      }
    };
  };

export const modificarMotivoBajaTurno = ( body ) => async (
    dispatch
    ) => {
    const response = await fetchConToken(
      `MotivosdeBajaTurno`,
      body,
      "PUT"
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    dispatch({
      type: types.motivosBajaTurnoModificar,
      payload: body
    });
}

export const eliminarMotivoBajaTurno = (id) => async (
    dispatch
    )=>{
      
     const response = await fetchConToken(
        `MotivosdeBajaTurno/${id}`,
         '',
        "DELETE"
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch({
        type: types.motivosBajaTurnoEliminar,
        payload: id
      });
    }

export const buscarMotivoBajaTurno = (text) => dispatch => {
    dispatch({
        type:types.motivosBajaTurnoBuscar,
        payload:text
    });
}

export const agregarMotivoBajaTurno = (descripcion) => async (
    dispatch
    ) => {
    let body = {
      descripcion:descripcion
    }
    const response = await fetchConToken(
      `MotivosdeBajaTurno`,
      body,
      "POST"
    );
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const area = await response.json();

        dispatch({
            type: types.motivosBajaTurnoAgregar,
            payload: area
        });
    }
  }