import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Home } from "@material-ui/icons";
import { Fragment, useCallback, useState } from "react";
import ItemMenuIzquierda from "../bar/ItemMenuIzquierda";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(2),
  }
}));


/**
 * @description Componente creado para minimizar el trabajo de migración de MUI v4 -> v5. \
 *              Todo objeto siempre tendra las props `nombre` e `icon`, si es una lista tiene `children`. \
 *              Lista de objetos tipada.
 *  
 * @author Daniel P. Becerra
 *      
 * 
 * @typedef {Object} BaseList
 * @prop {string} nombre Nombre de la ruta o desplegable.
 * @prop {import("react").ReactNode} icon `Home` Por defecto.
 * @prop {boolean?} tienePermiso Definido en el objeto inicial o junto a `children`, `true` por defecto en el inicial. \
 *                               No mostrara ruta o desplegable si es `false`
 * @prop {string?} ruta Va con `permisos`, no puede existir si `children` está declarado.
 * @prop {{[x: string]: string}?} permisos Definido con algun valor o `null`.
 * @prop {BaseList[]?} children No puede existir si `ruta` está declarada.
 * 
 * 
 * @param {{
 *  title: string;
 *  baseList: BaseList[];
 *  cerrarMenu: () => void;
 * }} MenuGeneric
 */
export const MenuGeneric = ({ title, baseList = [], cerrarMenu = () => void 0 }) => {
  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        baseList.map(({ tienePermiso = true, ruta, icon = Home, nombre, children, permisos, onClick }) => {
          if (!tienePermiso) return null;
          if (!ruta && !children) {
            console.log("[ERROR ESPERADO] No haz especificado una ruta o lista de rutas")
            return null
          }

          return (
            <Fragment key={nombre}>
              {
                children ? (
                  <CollapseList
                    nombre={nombre}
                    icon={icon}
                    permisos={permisos}
                    ruta={ruta}
                    children={children}
                    cerrarMenu={cerrarMenu}
                    classes={classes}
                    tienePermiso={tienePermiso}
                  />
                ) : (
                  <ItemMenuIzquierda
                    ruta={ruta}
                    icon={icon}
                    nombre={nombre}
                    permisos={permisos}
                    cerrarMenuIzquierda={cerrarMenu}
                    onClick={onClick}
                  />
                )
              }
            </Fragment>
          )
        })
      }
    </List>
  )
};

/** @param {BaseList & {classes: any}} */
const CollapseList = ({ nombre, icon: Icon, children, cerrarMenu, classes, permisos, tienePermiso, ruta, onClick }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleCollapse = useCallback(() => setOpen(x => !x), [nombre])

  //Para rutas anidadas sin acceso, ya que pueden no tener esta propiedad
  if (tienePermiso !== undefined && !tienePermiso) return null

  return (
    <>
      <ListItem component="button" button onClick={toggleCollapse}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={nombre} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          className={classes.nested}
          disablePadding
        >
          {
            children?.map(({ nombre: nNombre, icon = Home, ruta: nRuta, permisos: nPermisos, children: nChildren, tienePermiso: nTienePermiso = false, onClick }) => {

              if (!nTienePermiso && !nRuta) return null

              return nChildren ? (
                <CollapseList
                  key={nNombre}
                  classes={classes}
                  ruta={nRuta}
                  icon={icon}
                  nombre={nNombre}
                  permisos={nPermisos}
                  children={nChildren}
                  tienePermiso={nTienePermiso}
                  cerrarMenu={cerrarMenu}
                  isNested
                />
              ) : (
                <ItemMenuIzquierda
                  key={nNombre}
                  ruta={nRuta}
                  icon={icon}
                  nombre={nNombre}
                  permisos={nPermisos}
                  onClick={onClick}
                  cerrarMenuIzquierda={cerrarMenu} 
                />
              )
            }) ?? (
              <ItemMenuIzquierda
                ruta={ruta}
                icon={Icon}
                nombre={nombre}
                permisos={permisos}
                cerrarMenuIzquierda={cerrarMenu}
                onClick={onClick}
              />
            )}
        </List>
      </Collapse>
    </>
  )
}