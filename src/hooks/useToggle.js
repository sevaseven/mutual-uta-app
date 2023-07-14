import { useState, useCallback } from "react";

/**
 * Simple hook para invertir un valor booleano
 * en cada llamada de la función.
 * 
 * @param initBool - Inicializado como `false`
 * @param trackingMessage - Nombre del callback a trackear por la **consola del navegador**.
 * @returns {[boolean, () => void]} - Un arreglo con el booleano inicial y el callback que lo invierte.
 * @example ```js
 * const [isValid, toggleValidation] = useToggle(false)
 *  isValid // false;
 *  toggleValidation();
 *  isValid // true;
 *  toggleValidation();
 *  isValid // false;
 *  ```
 */
export const useToggle = (initBool = false, trackingMessage = "") => {
  const [bool, setBool] = useState(Boolean(initBool));

  const toggler = useCallback(() => setBool((prev) => {
    if (trackingMessage.length) {
      console.group(`Toggler: ${trackingMessage}`)
      console.log(`%cInicializado: ${initBool}`, "color:skyBlue")
      console.count("Llamado nº")
      console.log("%cValor Actual: ", "color:skyBlue", !prev)
      console.groupEnd()
    }
    return !prev
  }), [initBool]);


  return [bool, toggler];
}