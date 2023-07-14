import { remplazarPorTildeASinTilde, filter } from "../../helpers/Buscador";
import { types } from "../../types/types";

const initialState = {
  items: [],
  itemsAux: [],
  loading: false,
};

export const TopesMinimosabmReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.abmTraerTopesMinimosStart:
          return {
            ...state,
            loading: true,
          };
        case types.abmTraerTopesMinimosSuccess:
          return {
            ...state,
            loading: false,
            items: action.payload,
            itemsAux: action.payload
          };
        case types.abmTraerTopesMinimosError:
          return {
            ...state,
            loading: false,
            items: [],
          };
        case types.abmBuscarTopesMinimos:
          var itemsResults = state.itemsAux.filter(n => filter(remplazarPorTildeASinTilde(n.nombreResolucion), remplazarPorTildeASinTilde(action.payload)))
          return {
            ...state,
            items: itemsResults
          };
          case types.abmModificarTopesMinimos:
          return {
            ...state,
            loading: false,
            seleccionado: null,
            items: state.items.map( item => item.idTope === action.payload.idTope
              ? {...action.payload} 
              : item
            ),
          }; 
        default:
          return state;
      }
};
