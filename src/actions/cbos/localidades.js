import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { startSpinner, finishSpinner } from "../ui/spinner";
const urlBase= process.env.REACT_APP_URL


export const localidadesTraerStart = () => ({
  type: types.localidadesTraerStart,
});
export const localidadesTraerError = (error) => ({
  type: types.localidadesTraerError,
  payload: error,
});
export const localidadesTraerSuccess = (payload) => {
  return {
    type: types.localidadesTraerSuccess,
    payload: payload,
  };
};
export const fetchLocalidades = () => {
  return async (dispatch) => {
    dispatch(startSpinner());
    dispatch(localidadesTraerStart());
    const response = await fetchConToken(`localidades`);
    if (!response.ok) {
      dispatch({
        type: types.localidadesTraerError,
        payload: response.statusText,
      });
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length > 0) {
        dispatch(localidadesTraerSuccess(lista));
      }
    }
    dispatch(finishSpinner());
  };
};


export const fetchLocalidadesAutogestion = () => {
  return async (dispatch,getState) => {
    dispatch(localidadesTraerStart());
    const state = getState();
    const {usuarioAutogestion} =  state.userAutogestion;
    fetch(`${urlBase}/api/localidades`,{headers: {'Content-Type': 'application/json','Authorization':'Bearer '+usuarioAutogestion.token}})
    .then(res=>res.json())
    .then(res=>{
      if (res.length>0) {
        dispatch(localidadesTraerSuccess(res));     
      }
    })
  };
};