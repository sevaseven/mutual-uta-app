import { types } from "../types/types";

const camposDnD = [{
  id: "apeNom",
  name: "Apellido y Nombre"
},
{
  id: "cuil",
  name: "CUIL"
},
{
  id: "carnet",
  name: "Carnet N°"
},
{
  id: "idSexo",
  name: "Sexo"
},
{
  id: "idParentesco",
  name: "Parentesco"
},
{
  id: "idMotivoBaja",
  name: "Motivos de Baja",
},
{
  id: "mail",
  name: "EMail",
},
{
  id: "fechaNac",
  name: "Fecha de Nacimiento"
},
{
  id: "fechaAlta",
  name: "Fecha de Alta"
},
{
  id: "fechaBaja",
  name: "Fecha de Baja"
},
{
  id: "localidad",
  name: "Localidad"
},
{
  id: "provincia",
  name: "Provincia"
},
{
  id: "seccional",
  name: "Seccional"
},
{
  id: "empresas",
  name: "Empresas"
},
{
  id: "sitRevista",
  name: "Categoria"
},
{
  id: "idTipoAfiliacion",
  name: "Tipo de Relacion"
},
{
  id: "fechaFinCobertura",
  name: "Fecha Fin Cobertura"
},
{
  id: "seguimiento",
  name: "Seguimiento"
},
{
  id: "judicializado",
  name: "Judicializado"
},
{
  id: "rxr",
  name: "RXR"
},
{
  id: "sinFichaAfiliacion",
  name: "Sin Ficha"
},
{
  id: "calle",
  name: "Calle"
},
{
  id: "codigoPostal",
  name: "CP"
},
]

const initialState = {
  cargada: false,
  itemsUltimas: [],
  itemsEstadoTurnos: [],
  activas: [],
  cantXFecha: [],
  cantXFechaBajas: [],
  seccionalesAltasBajasXFecha: [],
  loading: false,
  error: null,
  reportesCustom: null,
  filtrosReportesCustom: null,
  columnasSinMostrarEnReportesCustom: camposDnD,
  columnasMostradasEnReportesCustom: [],
  infoAfiliadosSeccional: [],
  detalleSolicitudes: [],
};

export const indicadoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.indicadoresTraerStart:
      return {
        ...state,
        loading: true,
        error: null,
        cargada: false,
      };
    case types.indicadoresUltimasTraerSuccess:
      return {
        ...state,
        loading: false,
        itemsUltimas: action.payload,
        cargada: true,
      };
    case types.indicadoresTurnosEstadoTraerSuccess:
      return {
        ...state,
        loading: false,
        itemsEstadoTurnos: action.payload,
        cargada: true,
      };
    case types.indicadoresCantidadesxAfiliacionTraerSuccess:
      return {
        ...state,
        loading: false,
        activas: action.payload,
        cargada: true,
      };
    case types.indicadoresReporteCustomTraerSuccess:
      console.log(action.payload,'devolucion')
      return {
        ...state,
        loading: false,
        reportesCustom: action.payload,
        cargada: true
      }
    case types.setFiltrosReportesCustom:
      return {
        ...state,
        loading: false,
        filtrosReportesCustom: action.payload,
        cargada: true
      }
    case types.indicadoresCantidadxFechaTraerSuccess:
      return {
        ...state,
        loading: false,
        cantXFecha: action.payload,
        cargada: true,
      };
    case types.indicadoresTraerError:
      return {
        ...state,
        loading: false,
        error: action.payload,
        itemsUltimas: [],
        itemsEstadoTurnos: [],
        activas: [],
        cantXFecha: [],
        cargada: false,
      };
    case types.indicadoresLimpiar:
      return {
        ...initialState
      };
    case types.setColumnasSinMostrarReportesCustom:
      return {
        ...state,
        columnasSinMostrarEnReportesCustom: action.payload
      };
    case types.setColumnasMostradasReportesCustom:
      return {
        ...state,
        columnasMostradasEnReportesCustom: action.payload
      };
    case types.indicadoresCantidadxFechaBajasTraerSuccess:
      return {
        ...state,
        cantXFechaBajas: action.payload,
      }
    case types.indicadoresCantidadBajasAltasxSeccionalFechaTraerSuccess:
      return {
        ...state,
        seccionalesAltasBajasXFecha: action.payload,
      }
    case types.indicadoresTraerInfoAfiliadosSeccionalSuccess:
      return {
        ...state,
        infoAfiliadosSeccional: action.payload,
      }
    case types.indicadoresTraerInfoAfiliadosSeccionalError:
      return {
        ...state,
        infoAfiliadosSeccional: [],
      }
    case types.indicadoresTraerDetalleSolicitudesAutorizacionesSucces:
      return {
        ...state,
        detalleSolicitudes: action.payload,
      }
    case types.indicadoresTraerDetalleSolicitudesAutorizacionesError:
      return {
        ...state,
        detalleSolicitudes: [],
      }
    default:
      return state;
  }
};
