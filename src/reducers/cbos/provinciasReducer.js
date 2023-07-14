import { types } from "../../types/types";

const initialState = {
  cargada:false,
  items: [],
  loading: false,
  error: null
};

export const provinciasReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case types.provinciasTraerStart:
          return {
            ...state,
            loading: true,
            error: null,
            cargada: false
          };
        case types.provinciasTraerSuccess:
          return {
            ...state,
            loading: false,
            cargada:true,
            items: action.payload
          };
        case types.provinciasTraerError:
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
