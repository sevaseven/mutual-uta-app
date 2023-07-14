import { types } from "../../types/types";

const initialState = {
  cargada: false,
  items: [],
  loading: false,
  error: null,
  seleccionado: false,
  usuarioSeleccionado: {},
  usuarioNuevo:{},
};

export const usuariosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.usuariosTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
        seleccionado: false,
        usuarioSeleccionado: {},
      };
    case types.usuariosTraerSuccess:
      return {
        ...state,
        cargada: true,
        loading: false,
        items: action.payload,
      };
      case types.usuarioTraerYSeleccionarSuccess:
        return {
          ...state,
          seleccionado: true,
          usuarioSeleccionado: action.payload
        };
    case types.usuarioNuevo:
      return {
        ...state,
        usuarioNuevo: action.payload,
      };
    case types.usuariosTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        cargada: false,
      };
    case types.usuariosLimpiar:
      return {
        loading: false,
        items: [],
        cargada: false,
        seleccionado: false,
        usuarioNuevo:{}
      };
    case types.usuariosSeleccionar:
      return {
        ...state,
        seleccionado: true,
        usuarioSeleccionado: action.payload
      }
    case types.usuariosSeleccionarLimpiar:
      return {
        ...state,
        seleccionado: false,
        usuarioSeleccionado: {}
      }
    case types.usuariosSetCentrosMedicos:
      return {
        ...state,
        usuarioSeleccionado: {...state.usuarioSeleccionado, centrosMedicosUsuario: action.payload},
      };
    case types.usuariosUpdateUsuarioSeleccionado:
      return {
        ...state,
        usuarioSeleccionado: action.payload
      }
    default:
      return state;
  }
};
