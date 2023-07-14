import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { startSpinner, finishSpinner } from "../ui/spinner";
const urlBase= process.env.REACT_APP_URL

export const parentescosTraerStart = () => ({ type: types.parentescosTraerStart });
export const parentescosTraerError = (error) => ({ type: types.parentescosTraerError,payload: error});
export const parentescosTraerSuccess = (payload) => {
  return {
    type: types.parentescosTraerSuccess,
    payload: payload
  }
}


export const fetchParentescos = () => {
  return async (dispatch) => {
    dispatch(startSpinner());
      dispatch(parentescosTraerStart());
    const response = await fetchConToken(`Parentescos`);
    if (!response.ok) {
        dispatch(
            {
              type: types.parentescosTraerError,
              payload: response.statusText,
            }
          );
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length>0) {
        dispatch(parentescosTraerSuccess(lista));
      }
    }
    dispatch(finishSpinner());
  };
};

export const fetchParentescosAutoGestion = () => {
  return async (dispatch,getState) => {
    dispatch(startSpinner());
    dispatch(parentescosTraerStart());
    const state = getState();
    const {usuarioAutogestion} =  state.userAutogestion;
    fetch(`${urlBase}/api/Parentescos`,{headers: {'Content-Type': 'application/json','Authorization':'Bearer '+usuarioAutogestion.token}})
    .then(res=>res.json())
    .then(res=>{
      if (res.length>0) {
        dispatch(parentescosTraerSuccess(res));      
      }
    })
    dispatch(finishSpinner());
  };
};
