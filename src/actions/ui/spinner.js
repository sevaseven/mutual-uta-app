import { types } from "../../types/types";

export const startSpinner = () => {
  return (dispatch) => {
    dispatch(spinnerAbrir());
  };
};
export const finishSpinner = () => {
  return (dispatch) => {
    dispatch(spinnerCerrar());
  };
};
const spinnerAbrir = () => ({
  type: types.spinnerOpen,
});
const spinnerCerrar = () => ({
  type: types.spinnerClose,
});
