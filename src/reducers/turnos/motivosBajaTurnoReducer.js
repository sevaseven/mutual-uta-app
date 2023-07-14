import { types } from "../../types/types";

const initialState = {
    cargada: false,
    items: [],
    itemsAux:[],
    loading: false,
    error: null,
};

function remplazarPorTildeASinTilde(cadena){
  cadena = cadena.replace(/á/gi,"a");
  cadena = cadena.replace(/é/gi,"e");
  cadena = cadena.replace(/í/gi,"i");
  cadena = cadena.replace(/ó/gi,"o");
  cadena = cadena.replace(/ú/gi,"u");
  cadena = cadena.replace("?","");
  return cadena;
}

function filter(text, searchString) {
  const regexStr = '(?=.*' + searchString.split(/\s+/).join(')(?=.*') + ')';    //anterior /\,|\s/
  const searchRegEx = new RegExp(regexStr, 'gi');
  return text.match(searchRegEx) !== null;
}

export const motivosBajaTurnoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.motivosBajaTurnoTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
      };
    case types.motivosBajaTurnoTraerSuccess:
      return {
        ...state,
        loading: false,
        items: action.payload,
        itemsAux: action.payload,
        cargada: true,
      };
    case types.motivosBajaTurnoTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        itemsAux: [],
        cargada: false,
      };
    case types.motivosBajaTurnoLimpiar:
      return {
        loading: false,
        items: [],
        itemsAux: [],
        cargada: false,
      };
    case types.motivosBajaTurnoModificar:
      return {
        ...state,
        loading: false,
        items: state.items.map( item => item.idMbt === action.payload.id
          ? {...item, descripcion: action.payload.descripcion} 
          : item
        ),
        itemsAux: state.itemsAux.map( item => item.idMbt === action.payload.id
          ? {...item, descripcion: action.payload.descripcion} 
          : item
        ),
        cargada: true,
      };  
    case types.motivosBajaTurnoEliminar:
      return {
        ...state,
        loading: false,
        items: state.items.filter( item => item.idMbt !== action.payload ),
        itemsAux: state.itemsAux.filter( item => item.idMbt !== action.payload ),
        cargada: true,
      };
    case types.motivosBajaTurnoBuscar:
      return {
        ...state,
        loading: true,
        error: null,
        cargada:true,
        items: state.itemsAux.filter(n => filter(remplazarPorTildeASinTilde(n.descripcion),remplazarPorTildeASinTilde(action.payload)))
      };
    case types.motivosBajaTurnoAgregar:
      return {
        ...state,
        loading: true,
        error: null,
        cargada:true,
        items: [ ...state.items, action.payload ],
        itemsAux: [ ...state.itemsAux, action.payload ]
      };
    default:
      return state;
  }
};
