import moment from "moment"
import { MENU_MESA_ENTRADA } from "../utils/constants"

export const armarParametros = 
      (idEspecialidad, idCentroMedico = null, idProfesional = null, presencial = null, virtual = null, fecha = null
        ,hora = null, idTipoParametrizacion = null, filtrarPorUsuario = true, demanda = null, sobreTurnos = null
        ,filtros = null, fechaHasta = null, edadAfiliado = null, fechaDesde = null, callCenter = false) => {
    let str = ''
    if(idEspecialidad !== null)
      str += `&idEspecialidad=${idEspecialidad}`
    if(idCentroMedico !== null)
      str += `&idCentroMedico=${idCentroMedico}`
    if(idProfesional !== null)
      str += `&idProfesional=${idProfesional}`
    if(presencial !== null)
      str += `&presencial=${presencial}`
    if(virtual !== null)
      str += `&videoConsulta=${virtual}`
    if(fecha !== null)
      str += `&fecha=${fecha}`
    if(hora !== null)
      str += `&hora=${hora}`
    if(idTipoParametrizacion !== null)
      str += `&idTipoParametrizacion=${idTipoParametrizacion}`
    if(filtrarPorUsuario)
      str += `&filtrarPorUsuario=${filtrarPorUsuario}`
    if(demanda)
      str += `&demanda=${demanda}`
    if(sobreTurnos)
      str += `&sobreTurnos=${sobreTurnos}`
    if(filtros)
      str += `&filtros=${filtros}`
    if(fechaHasta)
      str += `&fechaHasta=${fechaHasta}`
    if(edadAfiliado || edadAfiliado === 0)
      str += `&edadAfiliado=${edadAfiliado}` 
    if(fechaDesde)
      str += `&fechaDesde=${fechaDesde}`
    if(callCenter)
      str += `&callCenter=${callCenter}`
    return str;
}

export const armarParametrosAutorizaciones = (idAfiliado, idCodNom, fechaDesde, fechaHasta, 
  idEstadoSolicitud, idEstadoPresupuesto, soloDenunciaInterDom, idSolicitud) => {
    let p1 = idAfiliado ? `&idAfiliado=${idAfiliado}` : ``;
    let p2 = idCodNom ? `&idCodNom=${idCodNom}` : ``;
    let p3 = fechaDesde ? `&fechaDesde=${fechaDesde.toISOString()}` : ``;
    let p4 = fechaHasta ? `&fechaHasta=${fechaHasta.toISOString()}` : ``;
    let p5 = idEstadoSolicitud ? `&idEstadoSolicitud=${idEstadoSolicitud}` : ``;
    let p6 = idEstadoPresupuesto ? `&idEstadoPresupuesto=${idEstadoPresupuesto}` : ``;
    let p7 = soloDenunciaInterDom ? `&soloDenunciaInternacionDomiciliaria=${soloDenunciaInterDom}` : ``;
    let p8 = idSolicitud ? `&idSolicitud=${idSolicitud}` : ``;

    return `${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}`;
}

export const armarParametrosRecetas = (idAfiliado, idMedicamento, fechaDesde, fechaHasta, 
  idEstadoReceta/*, idEstadoPresupuesto, soloDenunciaInterDom*/) => {
    let p1 = idAfiliado ? `&idAfiliado=${idAfiliado}` : ``;
    let p2 = idMedicamento ? `&idMedicamento=${idMedicamento}` : ``;
    let p3 = fechaDesde ? `&fechaDesde=${fechaDesde.toISOString()}` : ``;
    let p4 = fechaHasta ? `&fechaHasta=${fechaHasta.toISOString()}` : ``;
    let p5 = idEstadoReceta ? `&idEstadoReceta=${idEstadoReceta}` : ``;
    /*let p6 = idEstadoPresupuesto ? `&idEstadoPresupuesto=${idEstadoPresupuesto}` : ``;
    let p7 = soloDenunciaInterDom ? `&soloDenunciaInternacionDomiciliaria=${soloDenunciaInterDom}` : ``;*/

    //return `${p1}${p2}${p3}${p4}${p5}${p6}${p7}`;
    return `${p1}${p2}${p3}${p4}${p5}`;
}

export const armarParametrosEmpadronamiento = (idAfiliado, idTipoEmpadronamiento, fechaDesde, fechaHasta, 
  idEstadoSolicitud, esAuditor, esAuditorEsp, esAuditorDisca) => {
    let p1 = idAfiliado ? `&idAfiliado=${idAfiliado}` : ``;
    let p2 = idTipoEmpadronamiento ? `&idTipoEmpadronamiento=${idTipoEmpadronamiento}` : ``;
    let p3 = fechaDesde ? `&fechaDesde=${fechaDesde.toISOString()}` : ``;
    let p4 = fechaHasta ? `&fechaHasta=${fechaHasta.toISOString()}` : ``;
    let p5 = idEstadoSolicitud ? `&idEstadoSolicitud=${idEstadoSolicitud}` : ``;
    let p6 = esAuditor ? `&esAuditor=${esAuditor}` : ``;
    let p7 = esAuditorEsp ? `&esAuditorEsp=${esAuditorEsp}` : ``;
    let p8 = esAuditorDisca ? `&esAuditorDisca=${esAuditorDisca}` : ``;
    
    return `${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}`;
}

export const armarParametrosLiquidaciones = (idEfectorFacturacion, fechaDesde, fechaHasta, 
  idEstado) => {
    let p1 = idEfectorFacturacion ? `&idEfectorFacturacion=${idEfectorFacturacion}` : ``;
    let p2 = fechaDesde ? `&fechaDesde=${fechaDesde.toISOString()}` : ``;
    let p3 = fechaHasta ? `&fechaHasta=${fechaHasta.toISOString()}` : ``;
    let p4 = idEstado ? `&idEstado=${idEstado}` : ``;

    return `${p1}${p2}${p3}${p4}`;
}

export const armarParametrosBuscadorMesa = (idTipoEfector, activeBreadcrumb, tipoComprobanteDocumento, buscador) => {
  if(activeBreadcrumb === MENU_MESA_ENTRADA.GESTION_COMPROBANTES_PRESTADORES){
    let p1 = idTipoEfector ? `&idTipoEfector=${idTipoEfector}` : ``;
    let p2 = buscador ? `&buscador=${buscador.toString()}` : ``;
    return `${p1}${p2}`;
  }else{
    let p1 = tipoComprobanteDocumento ? `&tipoComprobanteDocumento=${tipoComprobanteDocumento}` : ``;
    let p2 = buscador ? `&buscador=${buscador.toString()}` : ``;
    return `${p1}${p2}`;
  }
}

export const armarParametrosMesaEntrada = (proveedor, idTipoEfector, fechaDesde, fechaHasta, activeBreadcrumb, tipoComprobanteDocumento) => {
  if(activeBreadcrumb === MENU_MESA_ENTRADA.GESTION_COMPROBANTES_PRESTADORES){
    let p1 = idTipoEfector ? `&idTipoEfector=${idTipoEfector}` : ``;
    let p2 = fechaDesde ? `&fechaDesde=${moment(fechaDesde).toISOString()}` : ``;
    let p3 = fechaHasta ? `&fechaHasta=${moment(fechaHasta).toISOString()}` : ``;
    let p4 = proveedor ? `&proveedor=${proveedor}` : ``;
    return `${p1}${p2}${p3}${p4}`;
  }else{
    let p1 = fechaDesde ? `&fechaDesde=${moment(fechaDesde).toISOString()}` : ``;
    let p2 = fechaHasta ? `&fechaHasta=${moment(fechaHasta).toISOString()}` : ``;
    let p3 = tipoComprobanteDocumento ? `&tipoComprobanteDocumento=${tipoComprobanteDocumento}` : ``;
    return `${p1}${p2}${p3}`;
  }
}

export const armarParametrosMesaEntradaAreas = ({proveedor, idTipoEfector, fechaDesde, fechaHasta, tipoComprobanteDocumento, idArea, idSubArea}, activeBreadcrumb) => {
  if(activeBreadcrumb === MENU_MESA_ENTRADA.GESTION_COMPROBANTES_PRESTADORES){
    let p1 = idTipoEfector ? `&idTipoEfector=${idTipoEfector}` : ``;
    let p2 = fechaDesde ? `&fechaDesde=${moment(fechaDesde).toISOString()}` : ``;
    let p3 = fechaHasta ? `&fechaHasta=${moment(fechaHasta).toISOString()}` : ``;
    let p4 = proveedor ? `&proveedor=${proveedor}` : ``;
    return `${p1}${p2}${p3}${p4}`;
  }else{
    let p1 = fechaDesde ? `&fechaDesde=${moment(fechaDesde).toISOString()}` : ``;
    let p2 = fechaHasta ? `&fechaHasta=${moment(fechaHasta).toISOString()}` : ``;
    let p3 = tipoComprobanteDocumento ? `&tipoComprobanteDocumento=${tipoComprobanteDocumento}` : ``;
    return `${p1}${p2}${p3}`;
  }
}