import { types } from "../../types/types";
import { remplazarPorTildeASinTilde ,filter} from "../../helpers/Buscador";

const initialState = {
cargada:false,
  items: [],
  itemsAux:[],
  loading: false,
  error: null
};

export const movimientosUserReducer = (state = initialState, action) => {    
    switch (action.type) {
      case types.movimientosUserTraerStart:
        return {
          ...state,
          loading: true,
          error: null,
          cargada:false
        };
        case types.movimientosUserLimpiar:
      return {
        loading: false,
        items: [],
        itemsAux:[],
        cargada: false,
      };
        case types.movimientosUserTraerSuccess:
          return {
            ...state,
            loading: false,
            items: action.payload,
            itemsAux:action.payload,
            cargada:true
          };
        case types.movimientosFindSucces:
          var lista = state.itemsAux.filter(n => filter(remplazarPorTildeASinTilde(n.usuario),remplazarPorTildeASinTilde(action.payload)))
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
