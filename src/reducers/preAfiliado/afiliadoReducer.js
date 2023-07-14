import { types } from "../../types/types";

const initialState = {
  error: null,
  afiliadoEncontrado:null,
  documentacionCompleta:false
};

export const afiliadoReducer = (state = initialState, action) => {   
    switch (action.type) {
        case types.consultaTraerAfiliadoPorCuil:
          return {
            ...state,
            cargada:true,
            afiliadoEncontrado:action.payload
          };
        case types.afiliacionesAfiliadoNuevoLimpiarSeleccion:
          return initialState
        case types.guardarAfiliadoNuevo:
          return {
            ...state,
            afiliadoEncontrado:{...state.afiliadoEncontrado,
              id_afiliado:action.payload.idAfiliado,
              idGrupoFamiliar:action.payload.idGrupoFamiliar
            }
           
          };
          case types.preafiliacionesActualizarDocumentacion:
            return {
              ...state,
                documentacionCompleta:action.payload
            };  
        default:
          return state;
      }
};