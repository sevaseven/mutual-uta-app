import { types } from "../../types/types";

const initialState = {
  cargada: false,
  items: [],
  item: null,
  loading: false,
  error: null,
  permisosRolSeleccionado: [],
  categorias:null
};

export const permisosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.permisosTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
      };
    case types.permisosTraerSuccess:
      return {
        ...state,
        loading: false,
        items: action.payload,
        cargada: true,
      };
    case types.permisosTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        cargada: false,
      };
    case types.permisosLimpiar:
      return {
        loading: false,
        items: [],
        cargada: false,
        seleccionado: false
      };
    case types.permisosRolSeleccionado:
      return {
        ...state,
        loading: false,
        permisosRolSeleccionado: action.payload,
        cargada: true,
      };
    case types.permisosSeleccionar:
      return {
        ...state,
        item: action.payload
      };
    case types.permisoLimpiar:
      return {
        ...state,
        item: null
      };
      case types.permisosCategoriasTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.permisosCategoriasTraerSuccess:
      return {
        ...state,
        loading: false,
        categorias: action.payload,
      };
    case types.permisosCategoriasTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        categorias: [],
      };
    default:
      return state;
  }
};
