import { types } from "../../types/types";

const initialState = {
  cargada: false,
  cargadaAltas: false,
  items: [],
  itemsAux: [],
  loading: false,
  error: null,
  seccionalesAltas: [],
  seccionalesAltasDisca: []
};

function remplazarPorTildeASinTilde(cadena) {
  cadena = cadena.replace(/á/gi, "a");
  cadena = cadena.replace(/é/gi, "e");
  cadena = cadena.replace(/í/gi, "i");
  cadena = cadena.replace(/ó/gi, "o");
  cadena = cadena.replace(/ú/gi, "u");
  cadena = cadena.replace("?", "");
  return cadena;
}

function filter(text, searchString) {
  const regexStr = "(?=.*" + searchString.split(/\s+/).join(")(?=.*") + ")"; //anterior /\,|\s/
  const searchRegEx = new RegExp(regexStr, "gi");
  return text.match(searchRegEx) !== null;
}

export const seccionalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.seccionalesTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
      };
    case types.seccionalesTraerSuccess:
      return {
        ...state,
        loading: false,
        cargada: true,
        items: action.payload,
        itemsAux: action.payload,
      };
    case types.seccionalesTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        cargada: false,
      };
    case types.seccionalesBuscar:
      var itemsResults = state.itemsAux.filter((n) =>
        filter(
          remplazarPorTildeASinTilde(n.descripcion_seccional),
          remplazarPorTildeASinTilde(action.payload)
        )
      );
      return {
        ...state,
        loading: true,
        error: null,
        cargadaAltas: true,
        items: itemsResults,
      };
    case types.seccionalesAltasSuccess:
      return {
        ...state,
        loading: false,
        cargadaAltas: true,
        seccionalesAltas: action.payload,
      };
    case types.seccionalesAltasDiscaSuccess:
        return {
          ...state,
          loading: false,
          cargadaAltas: true,
          seccionalesAltasDisca: action.payload,
        };
    default:
      return state;
  }
};
