import { types } from "../types/types";

const initialState = {
  open: false,
  mensaje: 'Por Favor Aguarde...',
};
export const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.spinnerOpen:
      return {
        open: true,
      };
    case types.spinnerClose:
      return {
        open: false,
      };
    default:
      return state;
  }
};
