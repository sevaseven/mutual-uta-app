import { types } from "../types/types";

const initialState = {
  cargada:false,
  items: [],
  loading: false,
  error: null
};

export const notificacionReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case types.notificacionTraerNotificacionStart:
          return {
            ...state,
            loading: true,
            error: null,
            cargada: false
          };
        case types.notificacionTraerNotificacionSuccess:
          return {
            ...state,
            loading: false,
            cargada:true,
            items: action.payload,
          };
        case types.notificacionTraerNotificacionError:
          return {
            ...state,
            loading: false,
            error: action.payload,
            items: [],
            cargada:false
          };
        case types.notificacionTraerNotificacionLimpiar:
        return {
            loading: false,
            items: [],
            cargada: false,
        };
        case types.notificacionModificarNotificacion:
          return {
            ...state,
            loading: false,
            items: state.items.map( item => item.idBeneficiariosLog === action.payload.id
              ? {...item, descripcion: action.payload.descripcion} 
              : item
            ),
            cargada: true,
          };  
        case types.notificacionEliminarNotificacion:
            return {
                ...state,
                loading: false,
                items: state.items.filter( item => item.idBeneficiariosLog !== action.payload ),
                cargada: true,
            };
        case types.notificacionAgregarNotificacion:
            return {
                ...state,
                loading: true,
                error: null,
                cargada:true,
                items: [ ...state.items, action.payload ],
            };
        default:
          return state;
      }
};
