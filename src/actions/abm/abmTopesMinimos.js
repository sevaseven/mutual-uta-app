import { fetchConToken } from "../../helpers/fetch";
import { handleErrorApi } from "../../helpers/randoms";
import { types } from "../../types/types";
import { startAlerta } from "../ui/alertas";
import { finishSpinner, startSpinner } from "../ui/spinner";
export const TopesMinimosTraerStart = () => ({ type: types.abmTraerTopesMinimosStart });
export const TopesMinimosTraerError = (error) => ({ type: types.abmTraerTopesMinimosError, payload: error });
export const TopesMinimosModificar = (payload) => ({ type: types.abmModificarTopesMinimos, payload: payload });
export const TopesMinimosTraerSuccess = (payload) => {
  return {
    type: types.abmTraerTopesMinimosSuccess,
    payload: payload
  }
}

export const TraerTopesMinimos = () => async (dispatch) => {
  try {
    dispatch(startSpinner());
    dispatch(TopesMinimosTraerStart());
    const response = await fetchConToken(`TopesMaximos`);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (response.status !== 200) throw lista.errores;
      dispatch(TopesMinimosTraerSuccess(lista));
    }
    dispatch(finishSpinner());
  } catch (error) {
    dispatch(finishSpinner());
    dispatch(TopesMinimosTraerError());
    handleErrorApi(dispatch, error, "Error al traer los topes minimos", "Ha ocurrido un error. Intente nuevamente")
  }
};


export const fetchTopesPorNombreResolucion = (nombreResolucion) => (dispatch) => {
  dispatch({
    type: types.abmBuscarTopesMinimos,
    payload: nombreResolucion
  });
}

export const AgregarTopes = (periodoDesde, periodoHasta, importe, importeMinimo, nombreResolucion) => async (dispatch) => {
  try {
    dispatch(startSpinner());
    const response = await fetchConToken(`TopesMaximos`, { periodoDesde, periodoHasta, importe, importeMinimo, nombreResolucion }, 'POST');
    const body = await response.json();
    if (response.ok) {
      dispatch(startAlerta("Tope creado correctamente", 'success', 'Comando Exitoso'));
      dispatch(finishSpinner());
      dispatch(TraerTopesMinimos());
    }else{
      throw body;
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al crear el tope.", "Ha ocurrido un error. Intente nuevamente")
  }
};

export const ModificarTopes = (nombreResolucion,periodoDesde,periodoHasta,importe, importeMinimo,id ) => async (dispatch) =>{
  try{
    dispatch(startSpinner());
    const response = await fetchConToken(`TopesMaximos/${id}`, { periodoDesde, periodoHasta, importe, importeMinimo, nombreResolucion }, 'PUT');
    const body = await response.json();
    if (response.ok) {
      dispatch(startAlerta("Tope modificado correctamente", 'success', 'Comando Exitoso'));
      dispatch(finishSpinner());
      dispatch(TraerTopesMinimos());
    } else {
      throw body;
    }
  } catch (error) {
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al actualizar el tope.", "Ha ocurrido un error. Intente nuevamente")
  }
}

export const EliminarTopes = (id) => async (dispatch)=>{
  try{
    const response = await fetchConToken(`TopesMaximos/${id}`,'','DELETE');
    const body = await response.json();
    if(response.ok){
      dispatch(startAlerta("Tope eliminado correctamente", 'success', 'Comando Exitoso'));
      dispatch(finishSpinner());
      dispatch(TraerTopesMinimos());
    }else{
      throw body;
    }
  }catch(error){
    dispatch(finishSpinner());
    handleErrorApi(dispatch, error, "Error al eliminar el tope.", "Ha ocurrido un error. Intente nuevamente")
  }
}