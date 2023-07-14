import { remplazarPorTildeASinTilde, filter } from "../../helpers/Buscador";
import { types } from "../../types/types";

const initialState = {
  items: [],
  itemsAux: [],
  loading: false,
};

export const abmCategoriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.abmTraerCategorias:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: true,
        items: action.payload,
        itemsAux: action.payload
      };
    case types.abmBuscarCategoria:
      var lista = state.itemsAux.filter(n => filter(remplazarPorTildeASinTilde(n.descripcion_sr), remplazarPorTildeASinTilde(action.payload)))
      return {
        ...state,
        loading: true,
        error: null,
        cargada: true,
        items: lista
      };
    default:
      return state;
  }
};
