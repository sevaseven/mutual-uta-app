import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { startSpinner, finishSpinner } from "../ui/spinner";
const urlBase= process.env.REACT_APP_URL

export const categoriasTraerStart = () => ({ type: types.categoriasTraerStart });
export const categoriasTraerError = (error) => ({ type: types.categoriasTraerError,payload: error});
export const categoriasTraerSuccess = (payload) => {
  return {
    type: types.categoriasTraerSuccess,
    payload: payload
  }
}

export const fetchCategorias = () => {
  return async (dispatch) => {
    dispatch(startSpinner());
      dispatch(categoriasTraerStart());
    const response = await fetchConToken(`situacionrevista`);
    if (!response.ok) {
        dispatch(
            {
              type: types.categoriasTraerError,
              payload: response.statusText,
            }
          );
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length>0) {
        dispatch(categoriasTraerSuccess(lista));
      }
    }
    dispatch(finishSpinner());
  };
};

export const fetchCategoriasAutogestion = () => {
  return async (dispatch,getState) => {
    dispatch(categoriasTraerStart());
    const state = getState();
    const {usuarioAutogestion} =  state.userAutogestion;  
    fetch(`${urlBase}/api/situacionrevista`,{headers: {'Content-Type': 'application/json','Authorization':'Bearer '+usuarioAutogestion.token}})
    .then(res=>res.json())
    .then(res=>{
      if (res.length>0) {
        dispatch(categoriasTraerSuccess(res));
      }
    })
  };
};
