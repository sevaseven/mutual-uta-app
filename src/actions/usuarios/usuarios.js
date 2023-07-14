import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { startSpinner,finishSpinner } from "../ui/spinner";
import { fileDeleteUserFirma, fileDeleteUserImage, fileUploadUserFirma, fileUploadUserImage } from "../../helpers/fileUpload";
import { startAlerta } from "../ui/alertas";
import { TAMANO_IMAGENES } from "../../utils/constants";
import { fileSize } from "../../helpers/filesFunctions";

export const usuariosTraerStart = () => ({ type: types.usuariosTraerStart });
export const usuariosLimpiar = () => ({ type: types.usuariosLimpiar });
export const usuariosTraerError = (error) => ({ type: types.usuariosTraerError,payload: error});
export const usuariosSetCentrosMedicos = (payload) => ({ type: types.usuariosSetCentrosMedicos, payload: payload});
export const usuariosTraerSuccess = (payload) => ({ type: types.usuariosTraerSuccess, payload: payload});
export const usuarioTraerYSeleccionarSuccess = (payload) => ({ type: types.usuarioTraerYSeleccionarSuccess, payload: payload});
export const usuariosSeleccionar = (payload) => ({ type: types.usuariosSeleccionar, payload: payload});
export const usuariosSeleccionarLimpiar = (payload) => ({ type: types.usuariosSeleccionarLimpiar, payload: payload});
export const usuariosUpdateUsuarioSeleccionado = (payload) => ({ type: types.usuariosUpdateUsuarioSeleccionado, payload: payload});
  
export const fetchUsuarios = (userName) => {
    return async (dispatch) => {
     dispatch(startSpinner());
        dispatch(usuariosTraerStart());
      const response = await fetchConToken(`Usuarios/traerUsuarios/${userName}`);
      if (!response.ok) {
          dispatch(usuariosTraerError(response.statusText));
        throw Error(response.statusText);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (lista.length>0) {
          dispatch(usuariosTraerSuccess(lista));
        }
      }
     dispatch(finishSpinner());
    };
};
export const fetchUsuario = (idUsuario) => {
    return async (dispatch) => {
     dispatch(startSpinner());
        dispatch(usuariosTraerStart());
      const response = await fetchConToken(`Usuarios/traerUsuarioPorId/${idUsuario}`);
      if (!response.ok) {
          dispatch(usuariosTraerError(response.statusText));
        throw Error(response.statusText);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const usuario = await response.json();
        dispatch(usuarioTraerYSeleccionarSuccess(usuario));
      }
     dispatch(finishSpinner());
    };
};

export const fetchUsuariosPorArea = (idArea) => {
  return async (dispatch) => {
   dispatch(startSpinner());
      dispatch(usuariosTraerStart());
    const response = await fetchConToken(`Usuarios/traerUsuariosPorArea/${idArea}`);
    if (!response.ok) {
        dispatch(usuariosTraerError(response.statusText));
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const lista = await response.json();
      if (lista.length>0) {
        dispatch(usuariosTraerSuccess(lista));
      }
    }
   dispatch(finishSpinner());
  };
};

export const startUploadingFirma = ( file, usuario ) => {
    return async( dispatch) => {
        dispatch(startSpinner());
        if (file.size <= TAMANO_IMAGENES.CERTIFICADOS) {
          const urlFirma = await fileUploadUserFirma( file, usuario.idUsuario );
          usuario.urlFirma = urlFirma;
          dispatch( usuariosUpdateUsuarioSeleccionado(usuario) );
          dispatch( startAlerta("Firma actualizada correctamente", "success", `Exito!`) );
        } else{
          dispatch(startAlerta(`El archivo no puede ser mayor a: ${fileSize(TAMANO_IMAGENES.CERTIFICADOS)} y el mismo tiene: ${fileSize(file.size)}`,'info'));
        }
        dispatch(finishSpinner());
    }  
}

export const startUploadingImage = ( file, usuario ) => {
    return async( dispatch) => {
        dispatch(startSpinner());
        if (file.size <= TAMANO_IMAGENES.CERTIFICADOS) {
          const urlImage = await fileUploadUserImage( file, usuario.idUsuario );
          usuario.urlImagen = urlImage;
          dispatch( usuariosUpdateUsuarioSeleccionado(usuario) );
        }else{
          dispatch(startAlerta(`El archivo no puede ser mayor a: ${fileSize(TAMANO_IMAGENES.CERTIFICADOS)} y el mismo tiene: ${fileSize(file.size)}`,'info'));
        }
        dispatch(finishSpinner());
    }  
}

export const startDeleteImage = ( usuario ) => {
  return async( dispatch) => {
    dispatch(startSpinner());
  
    await fileDeleteUserImage( usuario.idUsuario );
    usuario.urlImagen = null;
    
    dispatch( usuariosUpdateUsuarioSeleccionado(usuario) );
    dispatch(finishSpinner());
  }  
}

export const startDeleteFirma = ( usuario ) => {
  return async( dispatch) => {
    dispatch(startSpinner());
  
    await fileDeleteUserFirma( usuario.idUsuario );
    usuario.urlFirma = null;
    
    dispatch( usuariosUpdateUsuarioSeleccionado(usuario) );
    dispatch(finishSpinner());
  }  
}

export const addUser = (data, callback) => {
  return async (dispatch) => {
    try{
      dispatch(startSpinner());
      const response = await fetchConToken(`Usuarios`, data, 'POST');
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const usuario = await response.json();
        if (response.status !== 200) throw usuario.errores;
        dispatch( usuariosSeleccionarLimpiar() );
        dispatch( startAlerta("Se creo el User", "success", `Exito!`) );
        dispatch( usuariosSeleccionar(usuario) );
        dispatch( finishSpinner() );
        callback();
      }
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};


export const startUserUpdate = (data) => {
  return async (dispatch, getState) => {
    try{
      dispatch(startSpinner());
      data.cambioPassword = false;
      const response = await fetchConToken(`Usuarios`, data, 'PUT');
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const usuario = await response.json();
        if (response.status !== 200) {
          throw usuario.errores;
        } else {
          dispatch( startAlerta("Usuario actualizado", "success", `Exito!`) );
        } 

        const state = getState();
        const { usuarioSeleccionado } = state.usuarios;
        usuarioSeleccionado.userName = data.userName;
        usuarioSeleccionado.userLogin = data.userLogin;
        usuarioSeleccionado.dni = data.dni;
        usuarioSeleccionado.email = data.email;
        usuarioSeleccionado.observacion = data.observacion;
        usuarioSeleccionado.cambioPassword = false;
        usuarioSeleccionado.especialidadesUsuario = data.especialidadesUsuario;
        usuarioSeleccionado.matriculaNac = data.matriculaNac;
        usuarioSeleccionado.matriculaProv = data.matriculaProv;
        usuarioSeleccionado.idProvinciaCSF = data.idProvinciaCSF;
        dispatch( usuariosSeleccionar(usuarioSeleccionado) );
        
        dispatch(finishSpinner());
      }
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "error", `¡Error!`));
    }
  };
};

export const startUserPasswordReset = (idUsuario) => {
  return async (dispatch, getState) => {
    dispatch(startSpinner());
    
    const data = { idUsuario };  
    const response = await fetchConToken(`Usuarios/passwordReset/${idUsuario}`, data, 'PUT');
    console.log( response );
    
    if (!response.ok) {
        dispatch(usuariosTraerError(response.statusText));
      throw Error(response.statusText);
    }

    const state = getState();
    const { usuarioSeleccionado } = state.usuarios;
    usuarioSeleccionado.cambioPassword = true;
    dispatch( usuariosSeleccionar(usuarioSeleccionado) );
    
    dispatch(finishSpinner());
  };
};

export const startUserBaja = (idUsuario) => {
  return async (dispatch, getState) => {
    dispatch(startSpinner());
    
    const data = { idUsuario };  
    const response = await fetchConToken(`Usuarios/baja/${idUsuario}`, data, 'PUT');
    
    if (!response.ok) {
        dispatch(usuariosTraerError(response.statusText));
      throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const fechaBaja = await response.json();

      const state = getState();
      const { usuarioSeleccionado } = state.usuarios;
      usuarioSeleccionado.fechaBaja = fechaBaja;

      dispatch( usuariosUpdateUsuarioSeleccionado(usuarioSeleccionado) );
    }
    dispatch(finishSpinner());
  };
};

export const startUserUpdateEstado = (idUsuario, estado) => {
  return async (dispatch, getState) => {
    dispatch(startSpinner());
    const response = await fetchConToken(`Usuarios/estado`, {idUsuario, estado},'PUT');
    if (!response.ok) {
        dispatch(usuariosTraerError(response.statusText));
        throw Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {        
        const state = getState();
        const { usuarioSeleccionado } = state.usuarios;
        usuarioSeleccionado.estado = estado;

        dispatch( usuariosUpdateUsuarioSeleccionado(usuarioSeleccionado) );
    }
    dispatch(finishSpinner());
  };
};

export const setCentroMedicoUsuario = (idUsuario, idCentroMedico) => {
  return async (dispatch, getState) => {
    try{
      dispatch(startSpinner());
      const response = await fetchConToken(`usuariosCentrosMedicos`, {idUsuario, idCentroMedico},'POST');
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
          const item = await response.json();
          if (response.status !== 200) throw item.errores;

          const state = getState();
          const { centrosMedicosUsuario: centrosActuales } = state.usuarios.usuarioSeleccionado;
          const nuevosCentros = [ ...centrosActuales, item ];

          dispatch( usuariosSetCentrosMedicos(nuevosCentros) );
      }
      dispatch(finishSpinner());
    } catch (err){
        dispatch(finishSpinner());
        dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const eliminarCentroMedicoUsuario = (idUsuario, idCentroMedico) => {
  return async (dispatch, getState) => {
    try{
      dispatch(startSpinner());
      const response = await fetchConToken(`usuariosCentrosMedicos`, {idUsuario, idCentroMedico},'DELETE');
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
          const item = await response.json();
          if (response.status !== 200) throw item.errores;

          const state = getState();
          const { centrosMedicosUsuario: centrosActuales } = state.usuarios.usuarioSeleccionado;
          const nuevosCentros = centrosActuales.filter(s => s.idCentroMedico !== idCentroMedico );

          dispatch( usuariosSetCentrosMedicos(nuevosCentros) );
      }
      dispatch(finishSpinner());
    } catch (err){
        dispatch(finishSpinner());
        dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const startUserUpdatePassword = (idUsuario, oldPassword, newPassword, confirmPassword, closeModalCambioPassword) => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      const response = await fetchConToken(`Usuarios/cambioPassword`, {idUsuario, oldPassword, newPassword, confirmPassword},'PUT');
      if (response.ok) {
        dispatch( startAlerta("Se realizo correctamente el cambio de password", "success", `Exito!`) );
        closeModalCambioPassword();
      } else{
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) { 
          const resp = await response.json();
          throw resp.errores;
        }
      }
      dispatch(finishSpinner());
    } catch (err) {
      console.log( err );
      dispatch(finishSpinner());
      err.mensaje !== undefined ? dispatch(startAlerta(`Verifique`,'error',err.mensaje)) : dispatch(startAlerta('En caso de persistir el error contacte al administrador', 'error', 'Error de Conexión, intente nuevamente en unos instantes'));
    }
  };
};