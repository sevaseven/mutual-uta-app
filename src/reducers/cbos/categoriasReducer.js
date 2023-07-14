import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const categoriasReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case types.categoriasTraerStart:
          return {
            ...state,
            loading: true,
            error: null,
            cargada:false
          };
        case types.categoriasTraerSuccess:
          return {
            ...state,
            loading: false,
            items: action.payload,
            cargada:true
          };
        case types.categoriasTraerError:
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
