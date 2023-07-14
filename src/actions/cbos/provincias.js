import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { startSpinner, finishSpinner } from "../ui/spinner";
const urlBase= process.env.REACT_APP_URL

export const provinciasTraerStart = () => ({
  type: types.provinciasTraerStart,
});
export const provinciasTraerError = (error) => ({
  type: types.provinciasTraerError,
  payload: error,
});
export const provinciasTraerSuccess = (payload) => {
  return {
    type: types.provinciasTraerSuccess,
    payload: payload,
  };
};
export const fetchProvincias = () => {
  return async (dispatch) => {
    dispatch(startSpinner());
    dispatch(provinciasTraerStart());
    const response = await fetchConToken(`provincias`);
    if (!response.ok) {
      dispatch({
        type: types.provinciasTraerError,
        payload: response.statusText,
      });
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length > 0) {
        dispatch(provinciasTraerSuccess(lista));
      }
    }
    dispatch(finishSpinner());
  };
};

export const fetchProvinciasAutogestion = () => {
  return async (dispatch,getState) => {
    dispatch(provinciasTraerStart());
    const state = getState();
    const {usuarioAutogestion} =  state.userAutogestion;
    fetch(`${urlBase}/api/provincias`,{headers: {'Content-Type': 'application/json','Authorization':'Bearer '+usuarioAutogestion.token}})
    .then(res=>res.json())
    .then(res=>{
      if (res.status!==401) {
        dispatch(provinciasTraerSuccess(res));     
      }else{
        
      }
    })
  };
};
