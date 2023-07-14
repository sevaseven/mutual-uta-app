export const remplazarPorTildeASinTilde = (cadena) => {
    cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    cadena = cadena.replace("?","");
    return cadena;
  }
  
export  const  filter = (text, searchString) => {
    const regexStr = '(?=.*' + searchString.split(/\s+/).join(')(?=.*') + ')';   
    const searchRegEx = new RegExp(regexStr, 'gi');
    return text.match(searchRegEx) !== null;
  }