import { types } from "../types/types";

const initialState = {
  cargada: false,
  items: [],
  itemsAux: [],
  loading: false,
  error: null,
};

export const candidatosBajaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.candidatosBajaTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
      };
    case types.candidatosBajaTraerSuccess:
      return {
        ...state,
        loading: false,
        items: action.payload,
        itemsAux: action.payload,
        cargada: true,
      };
    case types.candidatosBajaTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        cargada: false,
      };
    case types.candidatosBajaLimpiar:
      return {
        loading: false,
        items: [],
        itemsAux: [],
        cargada: false,
      };
    case types.candidatosBajaFiltrar:
      return {
        ...state,
        loading: true,
        error: null,
        cargada:true,
        items: state.itemsAux.filter(s => s.tipo === action.payload),
      };
    default:
      return state;
  }
};
