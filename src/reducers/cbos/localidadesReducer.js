import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const localidadesReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case types.localidadesTraerStart:
          return {
            ...state,
            loading: true,
            error: null,
            cargada:false
          };
        case types.localidadesTraerSuccess:
          return {
            ...state,
            loading: false,
            items: action.payload,
            cargada:true
          };
        case types.localidadesTraerError:
          return {
            ...state,
            loading: false,
            error: action.payload,
            items: [],
            cargada:true
          };
    
        default:
          return state;
      }
};
