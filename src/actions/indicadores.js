import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { startSpinner, finishSpinner } from "./ui/spinner";
import { startAlerta } from "./ui/alertas";
import { handleErrorApi } from "../helpers/randoms"

export const indicadoresTraerStart = () => ({
  type: types.indicadoresTraerStart,
});
export const indicadoresLimpiar = () => ({
  type: types.indicadoresLimpiar,
});
export const indicadoresTraerError = (error) => ({
  type: types.indicadoresTraerError,
  payload: error,
});

export const indicadoresUltimasTraerSuccess = (payload) => {
  return {
    type: types.indicadoresUltimasTraerSuccess,
    payload: payload,
  };
};

export const indicadoresCantidadesxAfiliacionTraerSuccess = (payload) => {
  return {
    type: types.indicadoresCantidadesxAfiliacionTraerSuccess,
    payload: payload,
  };
};

export const indicadoresCantidadBajasAltasxSeccionalFechaTraerSuccess = (
  payload
) => {
  return {
    type: types.indicadoresCantidadBajasAltasxSeccionalFechaTraerSuccess,
    payload: payload,
  };
};

export const indicadoresCantidadxFechaTraerSuccess = (payload) => {
  return {
    type: types.indicadoresCantidadxFechaTraerSuccess,
    payload: payload,
  };
};

export const indicadoresCantidadxFechaBajasTraerSuccess = (payload) => {
  return {
    type: types.indicadoresCantidadxFechaBajasTraerSuccess,
    payload: payload,
  };
};

export const indicadoresTurnosEstadoTraerSuccess = (payload) => {
  return {
    type: types.indicadoresTurnosEstadoTraerSuccess,
    payload: payload,
  };
};

export const indicadoresTurnosCantidadesPorFechaTraerSuccess = (payload) => {
  return {
    type: types.indicadoresTurnosCantidadesPorFechaTraerSuccess,
    payload: payload,
  };
};

export const indicadoresReporteCustomTraerSuccess = (payload) => {
  return {
    type: types.indicadoresReporteCustomTraerSuccess,
    payload,
  };
};

export const fetchUltimasSolicitudes = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(`Indicadores/UltimasAfiliaciones`);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresUltimasTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchCantidadesxAfiliacion = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(`Indicadores/CantidadesxAfiliacion`);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresCantidadesxAfiliacionTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchAfiliacionesAltasBajasXFecha = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(
        `Indicadores/CantidadBajasAltasxSeccionalFecha`
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(
          indicadoresCantidadBajasAltasxSeccionalFechaTraerSuccess(lista)
        );
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchCantidadAfiliacionxFecha = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(
        `Indicadores/CantidadAfiliacionxFecha`
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresCantidadxFechaTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchCantidadAfiliacionBajasxFecha = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(
        `Indicadores/CantidadBajasAfiliacionxFecha`
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresCantidadxFechaBajasTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchTurnosCantidadAfiliacionxFecha = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(`Indicadores/CantidadTurnosxFecha`);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresCantidadxFechaTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchEstadoTurnos = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(`Indicadores/EstadoTurnos`);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresTurnosEstadoTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchTurnosCantidadesPorFecha = () => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(
        `Indicadores/CantidadeTurnosPorFechasPorEstado`
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresTurnosCantidadesPorFechaTraerSuccess(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchReporteCustom = (pagina = 1, filas = 20, filters = "", esSeccional = false, idSeccional = 0) => {
  return async (dispatch) => {

    if(esSeccional && !filters.includes("seccionales"))
      filters += "&seccionales=" + idSeccional;
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      let filters_formated = filters !== "" ? filters.substring(1) : filters;
      filters_formated = decodeURIComponent(filters_formated);
      const response = await fetchConToken(
        `Indicadores/ReporteCustom?pagina=${pagina}&totalPorPagina=${filas}&${filters_formated}`
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(indicadoresReporteCustomTraerSuccess(lista));
        dispatch(finishSpinner());
      }
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const fetchFiltrosGuardados = () => {
  return async (dispatch, getStore) => {
    try {
      dispatch(startSpinner());
      dispatch(indicadoresTraerStart());
      const response = await fetchConToken(
        `Filtros/${getStore().auth.idUsuario}`
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const lista = await response.json();
        if (response.status !== 200) throw lista.errores;
        dispatch(filtrosReportesCustom(lista));
      }
      dispatch(finishSpinner());
    } catch (err) {
      dispatch(finishSpinner());
      dispatch(startAlerta(err, "warning", `¡Error!`));
    }
  };
};

export const filtrosReportesCustom = (payload) => {
  return {
    type: types.setFiltrosReportesCustom,
    payload,
  };
};

export const setColumnasSinMostrarReportesCustom = (payload) => ({
  type: types.setColumnasSinMostrarReportesCustom,
  payload,
});

export const setColumnasMostradasReportesCustom = (payload) => ({
  type: types.setColumnasMostradasReportesCustom,
  payload,
});

export const getInfoAfiliadosPorSeccional = (idSeccional) => {
  return async (dispatch) => {
    try {
      dispatch(startSpinner());
      const response = await fetchConToken(
        `Indicadores/DetalleAfiliacionxSeccional/${idSeccional}`
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(finishSpinner());
        dispatch({
          type: types.indicadoresTraerInfoAfiliadosSeccionalSuccess,
          payload: body,
        });
      } else {
        throw body;
      }
    } catch (error) {
      dispatch(finishSpinner());
      dispatch({ type: types.indicadoresTraerInfoAfiliadosSeccionalError });
      handleErrorApi(
        dispatch,
        error,
        "Error al traer la información de los Afiliados",
        "Ha ocurrido un error. Intente nuevamente"
      );
    }
  };
};
export const DescargarInfoAfiliadosBajasExcel = (idSeccional) => async (dispatch) => {
  const url = `${process.env.REACT_APP_URL}/api/DetallesxSeccionalExcel/${idSeccional}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    let httpHeaders;
    if (token) {
        httpHeaders = {
            Authorization: `Bearer ${token}`,
        };
    }
    try {
        const result = await fetch(url, {
          method: "GET",
          headers: httpHeaders, 
        });
        const body = await result.blob(); 
        if(result.ok){
          const url = window.URL.createObjectURL(new Blob([body]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'PlanillaDatosInfoAfiliadosBaja.xlsx');
            document.body.appendChild(link);
            link.click();
          dispatch(finishSpinner());
        }else{
          throw body.errores;
        }
    } catch (error) {
        dispatch(finishSpinner());
        handleErrorApi(dispatch, error, "Error al descargar el archivo", "Ha ocurrido un error. Intente nuevamente")
    }

  }
  export const DescargarInfoAfiliadosAltasExcel = (idSeccional) => async (dispatch) => {
    const url = `${process.env.REACT_APP_URL}/api/DetallesxSeccionalExcel/InfoAltas/${idSeccional}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    let httpHeaders;
    if (token) {
        httpHeaders = {
            Authorization: `Bearer ${token}`,
        };
    }
    try {
        const result = await fetch(url, {
          method: "GET",
          headers: httpHeaders, 
        });
        const body = await result.blob(); 
        if(result.ok){
          const url = window.URL.createObjectURL(new Blob([body]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'PlanillaDatosInfoAfiliadosAlta.xlsx');
            document.body.appendChild(link);
            link.click();
          dispatch(finishSpinner());
        }else{
          throw body.errores;
        }
    } catch (error) {
        dispatch(finishSpinner());
        handleErrorApi(dispatch, error, "Error al descargar el archivo", "Ha ocurrido un error. Intente nuevamente")
    }
  }

  export const DescargarInfoAfiliadosReactivacionesExcel = (idSeccional) => async (dispatch) => {
    const url = `${process.env.REACT_APP_URL}/api/DetallesxSeccionalExcel/InfoReactivaciones/${idSeccional}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    let httpHeaders;
    if (token) {
        httpHeaders = {
            Authorization: `Bearer ${token}`,
        };
    }
    try {
        const result = await fetch(url, {
          method: "GET",
          headers: httpHeaders, 
        });
        const body = await result.blob(); 
        if(result.ok){
          const url = window.URL.createObjectURL(new Blob([body]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'PlanillaDatosInfoAfiliadosReactivaciones.xlsx');
            document.body.appendChild(link);
            link.click();
          dispatch(finishSpinner());
        }else{
          throw body.errores;
        }
    } catch (error) {
        dispatch(finishSpinner());
        handleErrorApi(dispatch, error, "Error al descargar el archivo", "Ha ocurrido un error. Intente nuevamente")
    }
  }
  export const getDetalleSolicitudesAutorizaciones = () => {
    return async (dispatch) => {
      try {
        dispatch(startSpinner());
        const response = await fetchConToken(
          `Indicadores/detalleSolicitudesAutorizaciones`
        );
        const body = await response.json();
        if (response.ok) {
          dispatch(finishSpinner());
          dispatch({
            type: types.indicadoresTraerDetalleSolicitudesAutorizacionesSucces,
            payload: body,
          });
        } else {
          throw body;
        }
      } catch (error) {
        dispatch(finishSpinner());
        dispatch({ type: types.indicadoresTraerDetalleSolicitudesAutorizacionesError });
        handleErrorApi(
          dispatch,
          error,
          "Error al traer la información de los Afiliados",
          "Ha ocurrido un error. Intente nuevamente"
        )
      }
    }
  }

