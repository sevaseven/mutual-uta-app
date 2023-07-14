import { filter, remplazarPorTildeASinTilde } from "../../helpers/Buscador";
import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  itemsAux:[],
  loading: false,
  error: null
};


export const abmReducer = (state = initialState, action) => {   
    switch (action.type) {
        case types.abmTraerTipoDocumentaciones:
          return {
            ...state,
            loading: true,
            error: null,
            cargada:true,
            items:action.payload,
            itemsAux:action.payload
          };
          case types.abmEliminarTipodocumentacion:
          return {
            ...state,
            loading: true,
            error: null,
            cargada:true,
            items:state.items.filter(item => item.idTipoDocumentaciones!==action.payload)
          };
          case types.abmAgregarTipoDocumentacion:
          return {
            ...state,
            loading: true,
            error: null,
            cargada:true,
            items:[...state.items,action.payload]
          };
          case types.abmBuscarDocumentaciones:
            var lista = state.itemsAux.filter(n => filter(remplazarPorTildeASinTilde(n.descripcionDocumentacion),remplazarPorTildeASinTilde(action.payload)))
          return {
            ...state,
            loading: true,
            error: null,
            cargada:true,
            items: lista
          };
        default:
          return state;
      }
};
