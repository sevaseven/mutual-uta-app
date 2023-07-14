import { Breadcrumbs, Button } from "@material-ui/core";
import { createElement } from "react";
import { useState } from "react";

/**
 * @description Este compononte fue creado para hacer mas fácil la migracíon de MUI v4 a v5 
 *              y no estar cambiando en cada archivo en un futuro.
 * 
 * @author Daniel P. Becerra
 * 
 * @typedef {{
 *  title: string,
 *  icon: import("react").ReactNode,
 *  isDisabled?: boolean,
 *  tienePermisos?: boolean,
 *  body: import("react").ReactNode,
 * }} BreadSlot
 *
 * @param {{
 *  breads: BreadSlot[],
 *  currentIndex?: null | number
 *  noRenderIndex?: boolean,
 * }} BreadCrumbsGeneric
 *

 * 
 * @param currentIndex `null` por defecto, insertar el indice **numerico** acorde al orden en breads.
 * @param noRenderIndex `true` por defecto, no renderiza ningun body inicialmente.
 * @param BreadSlot.isDisabled `false` por defecto.
 * @param BreadSlot.tienePermisos `true` por defecto.
 */
export const BreadCrumbsGeneric = ({
  breads,
  currentIndex = null,
  noRenderIndex = true,
}) => {
  const [index, setIndex] = useState(currentIndex ?? noRenderIndex ? -1 : 0);
  return (
    <>
      <Breadcrumbs style={{ color: "#FAFAFA" }} aria-label="breadcrumb">
        {breads.map(({ title, icon, isDisabled = false }, idx) => (
          <Button
            key={title}
            onClick={() => setIndex(idx)}
            disabled={isDisabled}
            color={idx === index ? "default" : "inherit"}
          >
            {icon}
            {title}
          </Button>
        ))}
      </Breadcrumbs>
      {breads.map(({ tienePermisos = true, title, body }, idx) => {
        return (
          tienePermisos &&
          idx === index &&
          createElement(body.type, { key: title, ...body.props })
        );
      })}
    </>
  );
};
