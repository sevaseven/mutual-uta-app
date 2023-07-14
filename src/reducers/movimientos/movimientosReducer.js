import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const movimientosReducer = (state = initialState, action) => {    
    switch (action.type) {
      case types.movimientosTraerStart:
        return {
          ...state,
          loading: true,
          error: null,
          cargada:false
        };
        case types.movimientosTraerSuccess:
          return {
            ...state,
            loading: false,
            items: action.payload,
            cargada:true
          };
          case types.movimientosLimpiar:
            return {
              loading: false,
              items: [],
              cargada:false
            };
        default:
          return state;
      }
};
