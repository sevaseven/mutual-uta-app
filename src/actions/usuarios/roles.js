import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { startAlerta } from "../ui/alertas";
///import { spinner, spinnerClose } from '../helpers/spinners';

export const rolesTraerStart = () => ({ type: types.rolesTraerStart });
export const rolesLimpiar = () => ({ type: types.rolesLimpiar });
export const rolesTraerError = (error) => ({ type: types.rolesTraerError,payload: error});
export const rolesTraerSuccess = (payload) => {
    return {
        type: types.rolesTraerSuccess,
        payload: payload
    }
}
export const rolesUsuarioSeleccionado = (payload) => {
    return {
        type: types.rolesUsuarioSeleccionado,
        payload: payload
    }
}
  
export const fetchRoles = () => {
    return async (dispatch) => {
        dispatch(rolesTraerStart());
        const response = await fetchConToken(`roles`);
        if (!response.ok) {
            dispatch(rolesTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();
            if (lista.length>0) {
                dispatch(rolesTraerSuccess(lista));
            }
        }
    };
};

export const fetchRolesUsuario = (idUsuario) => {
    return async (dispatch) => {
        dispatch(rolesTraerStart());
        const response = await fetchConToken(`usuarioRoles/traerRolesUsuario/${ idUsuario }`);
        if (!response.ok) {
            dispatch(rolesTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();

            dispatch( rolesUsuarioSeleccionado(lista) );
        }
    };
};

// export const setRolUsuario = (idUsuario, idRol) => {
//     return async (dispatch, getState) => {
//         dispatch(rolesTraerStart());

//         const response = await fetchConToken(`usuarioRoles`, {idUsuario, idRol},'POST');
//         if (!response.ok) {
//             dispatch(rolesTraerError(response.statusText));
//             throw Error(response.statusText);
//         }
//         const contentType = response.headers.get("content-type");
//         if (contentType && contentType.indexOf("application/json") !== -1) {
//             const lista = await response.json();
            
//             const state = getState();
//             const { rolesUsuarioSeleccionado: rolesActuales } = state.roles;
//             const nuevosRoles = [ ...rolesActuales, lista ];

//             dispatch( rolesUsuarioSeleccionado(nuevosRoles) );
//         }
//     };
// };

export const setRolUsuario = (idUsuario, idRol) => {
    return async (dispatch, getState) => {
        try{
            dispatch(rolesTraerStart());
            const response = await fetchConToken(`usuarioRoles`, {idUsuario, idRol},'POST');
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const respuesta = await response.json();
                if (!response.ok) throw respuesta.errores;
                
                const state = getState();
                const { rolesUsuarioSeleccionado: rolesActuales } = state.roles;
                const nuevosRoles = [ ...rolesActuales, respuesta ];

                dispatch( rolesUsuarioSeleccionado(nuevosRoles) );
            }
        } catch (err) {
            console.log( err );
            dispatch(startAlerta(err, "warning", `¡Error!`));
        }
    }; 
};

export const eliminarRolUsuario = (IdUserRol) => {
    return async (dispatch, getState) => {
        dispatch(rolesTraerStart());

        const response = await fetchConToken(`usuarioRoles`, {IdUserRol},'DELETE');
        if (!response.ok) {
            dispatch(rolesTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const state = getState();
            const { rolesUsuarioSeleccionado: rolesActuales } = state.roles;
            const nuevosRoles = rolesActuales.filter( s=> s.id !== IdUserRol)

            dispatch( rolesUsuarioSeleccionado(nuevosRoles) );
        }
    };
};

export const modificarRolUsuario = (idRol, descripcionRol) => {
    return async (dispatch, getState) => {
        dispatch(rolesTraerStart());

        const response = await fetchConToken(`roles/${ idRol }`, {idRol, descripcionRol},'PUT');
        if (!response.ok) {
            dispatch(rolesTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();

            const state = getState();
            const { items } = state.roles;
            items.forEach(function(item) {
                if(item.idRol === idRol)
                    item.descripcionRol = descripcionRol;
            });
              
            dispatch( rolesUsuarioSeleccionado(lista) );
        }
    };
};

  export const agregarRol = (descripcionRol) => {
    return async (dispatch, getState) => {
        dispatch(rolesTraerStart());
        const response = await fetchConToken(`roles`,{descripcionRol},'POST');
        if (!response.ok) {
            dispatch(rolesTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();
            console.log( lista );

            const state = getState();
            const { items } = state.roles;
            console.log( items );
            const nuevosRoles = [ ...items, lista ];

            dispatch( rolesTraerSuccess(nuevosRoles) );
        }
    };
};