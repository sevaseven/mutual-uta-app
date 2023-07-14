import { types } from "../types/types";

const initialState = {
  open: false,
  mensaje: '',
  titulo: '',
  tipo: undefined,
  autoHide: true
};
export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.alertaOpen:
      return {
        open: true,
        mensaje: action.payload.mensaje,
        titulo: action.payload.titulo,
        tipo: action.payload.tipo,
        autoHide: action.payload.autoHide,
      };
    case types.alertaClose:
      return {
        open: false,
        mensaje: '',
        titulo: '',
        tipo: undefined,
        autoHide: true
      };
    default:
      return state;
  }
};
