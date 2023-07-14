import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const motivosBajaReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.motivosBajaTraerSucces:
          return {
            ...state,
            loading: false,
            items: action.payload,
            cargada:true
          };
        case types.motivosBajaTraerError:
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