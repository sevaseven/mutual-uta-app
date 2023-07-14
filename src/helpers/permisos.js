import { AREAS_FISICAS } from "../utils/constants";

export const validarPermisos=(permisosUser, permisos)=>{
    let tienePermiso=true
    for (let index = 0; index < permisos.length; index++) {
        const element = permisos[index];
        if (!permisosUser.some((e) => e.codigo === element)) {
            tienePermiso = false
            break;
          }
    }

    return tienePermiso
}

export const validarQueTengaAunqueSeaUnSoloPermiso=(permisosUser, permisos)=>{
    // eslint-disable-next-line 
    for (let index = 0; index < permisos.length; index++) {
        let auxkeys=Object.keys(permisos[index])
        for (let index2 = 0; index2 < auxkeys.length; index2++) {
            if (permisosUser.some((e) => e.codigo === permisos[index][auxkeys[index2]])) {
                return true
            }
        }
        
    }

    return false
}

export const validarSoloUnPermiso=(permisosUser, permiso)=>{
    return permisosUser.some((e) => e.codigo === permiso)
}

export const validarQueTengaAreaFisica=(areasFisicasUsuario)=>{
    if(!areasFisicasUsuario) return false

    return Object.values(AREAS_FISICAS).includes(areasFisicasUsuario.idArea);
}