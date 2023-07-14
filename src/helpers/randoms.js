import { startAlerta } from "../actions/ui/alertas";

const reg = new RegExp(/^[¡!¿? ]{0,}[a-zàáèéìíòóùú]/);

export function capitalize(s = '', allWords = false){
  // Separamos por espacios
  // Así buscamos palabras
  let spl = s.split(' ');
  // Si allWords es true
  // Y hay más de una palabra ( De lo contrario daría error : Sin esta condición daría error con allWords=true y 1 palabra (Too much recursion))
  if(allWords && spl.length > 1){
    return spl
      // Capilatilzamos cada una de las palabras
      .map( ss => capitalize(ss) )
      // Lo unimos nuevamente por un espacio
      .join(' ');
  }
  // Resultado de ejecutar la expresión regular sobre s
  let r = reg.exec(s);
  // Si hay resultado reemplazamos por la versión capitalizada, de lo contrario devolvemos el string original
  // eslint-disable-next-line
  return (r = r && r[0])
    ? s.replace(r, r.toUpperCase())
    : s;
}

export const handleErrorApi = (dispatch, error, messageLog, messageUser, autoHide = true) => {
  console.log(messageLog, error);
  if (error?.errores) {
      dispatch(startAlerta(error?.errores?.mensaje || error?.errores, "error", "", autoHide))
  } else {
      dispatch(startAlerta(messageUser, "error", "", autoHide))
  }
}