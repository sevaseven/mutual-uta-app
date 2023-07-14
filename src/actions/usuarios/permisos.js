import { types } from "../../types/types";
import { fetchConToken } from "../../helpers/fetch";
import { startAlerta } from "../ui/alertas";
import { finishSpinner, startSpinner } from "../ui/spinner";
import PermisosService from "../../services/PermisosService";

export const permisosTraerStart = () => ({ type: types.permisosTraerStart });
export const permisosLimpiar = () => ({ type: types.permisosLimpiar });
export const permisosTraerError = (error) => ({ type: types.permisosTraerError, payload: error });
export const permisosTraerSuccess = (payload) => {
    return {
        type: types.permisosTraerSuccess,
        payload: payload
    }
}
export const permisosRolSeleccionado = (payload) => {
    return {
        type: types.permisosRolSeleccionado,
        payload: payload
    }
}

export const fetchPermisos = (label = null) => {
    return async (dispatch) => {
        if (label !== null) {
            dispatch(startSpinner())
        }
        dispatch(permisosTraerStart());
        let response;
        if (label && label !== "") {
            response = await fetchConToken(`permisos/TraerPorLabel/${label}`);
        } else {
            response = await fetchConToken(`permisos`);
        }
        if (!response.ok) {
            dispatch(permisosTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();
            if (lista.length > 0) {
                dispatch(permisosTraerSuccess(lista));
            }
        }

        if (label !== null) {
            dispatch(finishSpinner())
        }
    };
};

export const fetchPermisosRol = (idRol) => {
    return async (dispatch) => {
        dispatch(permisosTraerStart());
        const response = await fetchConToken(`rolesPermisos/traerPermisosRol/${idRol}`);
        if (!response.ok) {
            console.log("permisosTraerError");
            dispatch(permisosTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();
            dispatch(permisosRolSeleccionado(lista));
        }
    };
};

export const setPermisoRol = (idRol, idPermiso) => {
    return async (dispatch, getState) => {
        dispatch(permisosTraerStart());

        const response = await fetchConToken(`rolesPermisos`, { idRol, idControl: idPermiso }, 'POST');
        if (!response.ok) {
            dispatch(permisosTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const lista = await response.json();

            const state = getState();
            const { permisosRolSeleccionado: permisosActuales } = state.permisos;
            const nuevosPermisos = [...permisosActuales, lista];

            dispatch(permisosRolSeleccionado(nuevosPermisos));
        }
    };
};

export const eliminarPermisoRol = (idRolPermiso) => {
    return async (dispatch, getState) => {
        dispatch(permisosTraerStart());
        const response = await fetchConToken(`rolesPermisos`, { idAccesoPorRol: idRolPermiso }, 'DELETE');
        if (!response.ok) {
            dispatch(permisosTraerError(response.statusText));
            throw Error(response.statusText);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const state = getState();
            const { permisosRolSeleccionado: permisosActuales } = state.permisos;
            const nuevosPermisos = permisosActuales.filter(s => s.idAccesoPorRol !== idRolPermiso)

            dispatch(permisosRolSeleccionado(nuevosPermisos));
        }
    };
};

export const limpiarUnPermiso = () => {
    return {
        type: types.permisoLimpiar
    }
}

export const setearUnPermiso = (data) => {
    return {
        type: types.permisosSeleccionar,
        payload: data
    }
}

export const fetchGuardarPermiso = (data) => {
    return async (dispatch) => {
        dispatch(startSpinner())
        try {
            let response = await fetchConToken(`Permisos`, data, 'PUT')
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(startAlerta('Permiso almacenado correctamente', 'success'))
            dispatch(finishSpinner())

            dispatch(fetchPermisos())
        } catch (error) {
            dispatch(finishSpinner())
            console.error("Error al guardar Permiso: ", error)
            dispatch(startAlerta('Error al almacenar permiso', 'error'))
        }

    };
};

export const fetchCategoriasPermisos = () => async (dispatch) => {
    try {
        dispatch({type: types.permisosCategoriasTraerStart})
        const response = await PermisosService.get()
        const body = await response.json()
        if (response.ok) {
            dispatch({
                type: types.permisosCategoriasTraerSuccess,
                payload: body
            })
        } else {
            throw body
        }
    } catch (error) {
        console.log("Error al obtener categorias permisos: ", error)
        dispatch({type: types.permisosCategoriasTraerError})
        if (error.errores && error.errores.mensaje) {
            dispatch(startAlerta(error.errores.mensaje, "error"))
        } else {
            dispatch(startAlerta("Ha ocurrido un error. Intente nuevamente.", "error"))
        }
    }
};