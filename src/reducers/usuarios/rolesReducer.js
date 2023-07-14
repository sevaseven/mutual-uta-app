import { types } from "../../types/types";

const initialState = {
  cargada: false,
  items: [],
  loading: false,
  error: null,
  rolesUsuarioSeleccionado: []
};

export const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.rolesTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
      };
    case types.rolesTraerSuccess:
      return {
        ...state,
        loading: false,
        items: action.payload,
        cargada: true,
      };
    case types.rolesTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        cargada: false,
      };
      case types.rolesLimpiar:
        return {
          loading: false,
          items: [],
          cargada: false,
          seleccionado: false
        };
      case types.rolesUsuarioSeleccionado:
        return {
          ...state,
          loading: false,
          rolesUsuarioSeleccionado: action.payload,
          cargada: true,
        };
    default:
      return state;
  }
};
