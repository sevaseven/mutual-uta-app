import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const causaBajasReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case types.causaBajaTraerStart:
          return {
            ...state,
            loading: true,
            error: null,
            cargada:false
          };
        case types.causaBajaTraerSuccess:
          return {
            ...state,
            loading: false,
            items: action.payload,
            cargada:true
          };
        case types.causaBajaTraerError:
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
