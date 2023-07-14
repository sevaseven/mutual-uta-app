import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { seccionalesReducer } from "./cbos/seccionalesReducer";
import { localidadesReducer } from "./cbos/localidadesReducer";
import { provinciasReducer } from "./cbos/provinciasReducer";
import { categoriasReducer } from "./cbos/categoriasReducer";
import { motivosBajaReducer } from "./cbos/motivosBajaReducer";
import { alertReducer } from "./alertReducer";
import { spinnerReducer } from "./spinnerReducer";
import { usuariosReducer } from "./usuarios/usuariosReducer";
import { configuracionesReducer } from "./configuraciones/configuracionReducer";
import { abmReducer } from "./abm/abmReducer";
import { rolesReducer } from "./usuarios/rolesReducer";
import { permisosReducer } from "./usuarios/permisosReducer";
import { notificacionReducer } from "./notificacionReducer";
import { stepperReducer } from "./preAfiliado/stepperReducer";
import { indicadoresReducer } from "./indicadoresReducer";
import { configuracionesCategoriaReducer } from "./configuraciones/configuracionesCategoriaReducer";
import { abmCategoriaReducer } from "./abm/abmCategorias";
import { candidatosBajaReducer } from "./candidatosBajaReducer";
import { movimientosReducer } from "./movimientos/movimientosReducer";
import { movimientosUserReducer } from "./movimientosUser/movimientosUserReducer";
import { motivosBajaTurnoReducer } from "./turnos/motivosBajaTurnoReducer";
import { trackingAbmReducer } from "./trackingAbmReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  candidatosBaja: candidatosBajaReducer,
  categoriaAux: abmCategoriaReducer,
  categorias: categoriasReducer,
  configuraciones: configuracionesReducer,
  configuracionesCategoria: configuracionesCategoriaReducer,
  documentos: abmReducer,
  indicadores: indicadoresReducer,
  localidades: localidadesReducer,
  motivosBajaTurno: motivosBajaTurnoReducer,
  movimientos: movimientosReducer,
  movimientosUser: movimientosUserReducer,
  motivosBaja: motivosBajaReducer,
  notificacion: notificacionReducer,
  permisos: permisosReducer,
  provincias: provinciasReducer,
  roles: rolesReducer,
  seccionales: seccionalesReducer,
  spinner: spinnerReducer,
  stepper: stepperReducer,
  trackingAbm: trackingAbmReducer,
  usuarios: usuariosReducer
});
