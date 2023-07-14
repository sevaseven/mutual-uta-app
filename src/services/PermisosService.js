import { fetchConToken  } from "../helpers/fetch";

const PermisosService = {
  get: () => {
    return fetchConToken(`Permisos/categorias`)
  },
  crearCategoria: (data) => {
    return fetchConToken(`Permisos/categorias`, data, "POST")
  },
  guardarCategoria: (data) => {
    return fetchConToken(`Permisos/categorias/${data.idCategoria}`, data, "PUT")
  }
}

export { PermisosService as default }