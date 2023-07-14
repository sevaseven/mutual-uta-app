import { startAlerta } from "../actions/ui/alertas";
import { TAMANO_IMAGENES } from "../utils/constants";
import { fileSize } from "./filesFunctions";

const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinTokenExterno = (Url, endpoint, data, method = 'GET' ) => {

    const url = `${ Url }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    let httpHeaders;
    if (token) {
      httpHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      httpHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
    }
    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: httpHeaders
        });
    } else {
        return fetch( url, {
            method,
            headers: httpHeaders,
            body: JSON.stringify( data )
        });
    }
}

const fetchConTokenFiles = ( endpoint, file, dispatch ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    let httpHeaders;
    if (token) {
      httpHeaders = {
        Authorization: `Bearer ${token}`,
      };
    }

    if (file?.size <= TAMANO_IMAGENES.DOCUMENTACION_AFILIADOS) {
        const formData = new FormData();
        formData.append("files", file);

        return fetch(url, {
            method: "POST",
            body: formData,
            headers: httpHeaders
        });
    } else {
        dispatch( startAlerta(
            `El archivo no puede ser mayor a: ${fileSize(
            TAMANO_IMAGENES.DOCUMENTACION_AFILIADOS
            )} y el mismo tiene: ${fileSize(file.size)}`,
            "info"
        ));
    }
}

export {
    fetchSinToken,
    fetchConToken,
    fetchSinTokenExterno,
    fetchConTokenFiles
}