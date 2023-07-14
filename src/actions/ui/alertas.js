import { types } from "../../types/types";

export const startAlerta =(mensaje,tipo,titulo, autoHide = true)=>{
  // console.log('mensaje',mensaje,'tipo',tipo,'titulo',titulo)
    return (dispatch) => {
        dispatch(alertaAbrir(mensaje,tipo,titulo, autoHide));
      };
}
export const finishAlerta =()=>{
    return (dispatch) => {
        dispatch(alertaCerrar());
      };
}
const alertaAbrir = (mensaje,tipo,titulo, autoHide) => ({
    type: types.alertaOpen,
    payload: {
        mensaje: mensaje,
        tipo:tipo,
        titulo:titulo,
        autoHide
    },
  });
  const alertaCerrar = () => ({
    type: types.alertaClose,
  });