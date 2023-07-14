import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const configuracionesCategoriaReducer = (state = initialState, action) => {    
    switch (action.type) {
      case types.configuracionPorCategoriaTraerStart:
        return {
          ...state,
          loading: true,
          error: null,
          cargada:false
        };
        case types.configuracionPorCategoriaTraerError:
          return {
            ...state,
            loading: false,
            error: action.payload,
            items: [],
            cargada:false
          };
    
        case types.configuracionPorCategoriaTraerSuccess:
          return {
            ...state,
            loading: false,
            error: null,
            cargada:true,
            items:action.payload
          };
          case types.configuracionCategoriaLimpiar:
            return {
              ...initialState
            }  
        default:
          return state;
      }
};
