import { types } from "../../types/types";

const initialState = {
cargada:false,
  items: [],
  loading: false,
  error: null
};

export const configuracionesReducer = (state = initialState, action) => {    
    switch (action.type) {
      case types.tipoDocumentacionPorTipoAfilacionTraerStart:
        return {
          ...state,
          loading: true,
          error: null,
          cargada:false
        };
        case types.tipoDocumentacionPorTipoAfilacionTraerError:
          return {
            ...state,
            loading: false,
            error: action.payload,
            items: [],
            cargada:false
          };
    
        case types.tipoDocumentacionPorTipoAfilacion:
          return {
            ...state,
            loading: false,
            error: null,
            cargada:true,
            items:action.payload
          };
        case types.tipoDocumentacionPorTipoAfilacionObligatorioModificado:        
          let payload=Object.values(action.payload);
          return {
            ...state,
            loading: true,
            error: null,
            cargada:true,
            items: state.items.map((item)=>item.idTipoDocumentacionesTipoAfiliacion===payload[0]
            ? {
              ...item,
              obligatorio:payload[2]?payload[1]:false
            }:item)
            };
        case types.tipoDocumentacionPorTipoAfilacionEliminar:  
          return {
            ...state,
            loading: true,
            error: null,
            cargada:true,
            items: state.items.map(
              item => item.idTipoDocumentacionesTipoAfiliacion === action.payload
                ? { ...item, marcado: false }
                : item
            )
            };
        case types.tipoDocumentacionPorTipoAfilacionNuevo:  
            return {
              ...state,
              loading: true,
              error: null,
              cargada:true,
              items: state.items.map((item)=>item.idTipoDocumentaciones===action.payload.idTipoDocumentaciones
                ? {
                  ...item,
                  idTipoDocumentacionesTipoAfiliacion:action.payload.idTipoDocumentacionesTipoAfiliacion,
                  idTipoDocumentaciones:action.payload.idTipoDocumentaciones,
                  idTipoAfiliacion:action.payload.idTipoAfiliacion,
                  obligatorio:action.payload.obligatorio,
                  marcado:action.payload.marcado
                }:item)
              };
          case types.configuracionLimpiar:
            return {
              ...initialState
            }  
          case types.tipoDocumentacionPorTipoParentescoObligatorioModificado:        
            let payloadParentesco=Object.values(action.payload);
            return {
              ...state,
              loading: true,
              error: null,
              cargada:true,
              items: state.items.map((item)=>item.idTipoDocumentacionesParentesco===payloadParentesco[0]
              ? {
                ...item,
                obligatorio:payloadParentesco[2]?payloadParentesco[1]:false
              }:item)
            };
          case types.tipoDocumentacionPorTipoParentescoNuevo:  
            return {
              ...state,
              loading: true,
              error: null,
              cargada:true,
              items: state.items.map((item)=>item.idTipoDocumentaciones===action.payload.idTipoDocumentaciones
                ? {
                  ...item,
                  idTipoDocumentacionesParentesco:action.payload.idTipoDocumentacionesParentesco,
                  idTipoDocumentaciones:action.payload.idTipoDocumentaciones,
                  idParentesco:action.payload.idParentesco,
                  obligatorio:action.payload.obligatorio,
                  marcado:action.payload.marcado
                }
                : item
              )
            };
          case types.tipoDocumentacionTipoParentescoEliminar:  
            return {
              ...state,
              loading: true,
              error: null,
              cargada:true,
              items: state.items.map(
                item => item.idTipoDocumentacionesParentesco === action.payload
                  ? { ...item, marcado: false }
                  : item
              )
            };
        default:
          return state;
      }
};
