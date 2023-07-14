import { useDispatch, useSelector } from "react-redux";

import {
  AccountBalance,
  AccountBox,
  ArtTrack,
  Assignment,
  AssignmentInd,
  AttachMoney,
  BorderColor,
  Category,
  Equalizer,
  Description,
  Domain,
  EnhancedEncryption,
  FileCopyOutlined,
  Group,
  ImportContacts,
  Home,
  HowToReg,
  Iso,
  ListAlt,
  LocalAtm,
  LocalHospitalSharp,
  People,
  PermIdentity,
  PersonOutline,
  SupervisedUserCircle,
  Settings,
  Stars,
  Today,
  PostAdd,
  MonetizationOn,
  Shop,
  LocalPharmacy,
  Accessible,
  PeopleAlt,
  FolderShared,
  LocalHospital,
  PersonAdd,
} from "@material-ui/icons";
import {
  PERMISOS_PERMISOS,
  ROLES_PERMISOS,
  USUARIOS_PERMISOS,
} from "../../utils/permisos";
import { MenuGeneric } from "../compartidos/MenuGeneric";
import { validarQueTengaAunqueSeaUnSoloPermiso, validarSoloUnPermiso } from "../../helpers/permisos";

export const MenuIzquierda = ({ handleclose }) => {
  const dispatch = useDispatch();
  const { permisos: permisosUser, areas: areasUsuario } = useSelector((state) => state.auth);

  return (
    <MenuGeneric
      title="Beneficiarios"
      cerrarMenu={handleclose}
      baseList={[
        {
          tienePermiso: validarQueTengaAunqueSeaUnSoloPermiso(permisosUser, [
            PERMISOS_PERMISOS,
            ROLES_PERMISOS,
            USUARIOS_PERMISOS,
          ]),
          icon: SupervisedUserCircle,
          nombre: "Configuración de Usuarios",
          children: [
            {
              icon: PermIdentity,
              nombre: "Permisos",
              ruta: "/usuarios/permisos",
              permisos: PERMISOS_PERMISOS
            },
            {
              icon: Stars,
              nombre: "Roles",
              ruta: "/usuarios/roles",
              permisos: ROLES_PERMISOS
            },
            {
              icon: PersonOutline,
              nombre: "Usuarios",
              ruta: "/usuarios/usuario",
              permisos: USUARIOS_PERMISOS
            }
          ]
        },
        // {
        //   icon: PermIdentity,
        //   nombre: "Movimientos User",
        //   ruta: "/usuarios/movimientos",
        //   permisos: REPORTES_PERMISOS
        // }
      ]}
    />
  );
};