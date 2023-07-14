import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    }

    const handleInputChange = ({ target }) => {
        //Esto de dividir el name, es para poder usar la misma funcion al modificar un hijo
        // EJEMPLO: target.name -> domiciliosAfiliados.calle
        let propsObject = target.name.split('.')
        if(propsObject.length === 2){
            setValues({
                ...values,
                [propsObject[0]]:{
                    ...values[propsObject[0]],
                    [propsObject[1]]:target.value
                }
            })
        }else{
            setValues({
                ...values,
                [target.name]: target.value
            });
        }
        
    }

    const setearValor = (name, valor) => {
         //Esto de dividir el name, es para poder usar la misma funcion al modificar un hijo
        // EJEMPLO: target.name -> domiciliosAfiliados.calle
        let propsObject = name.split('.')
        if(propsObject.length === 2){
            setValues({
                ...values,
                [propsObject[0]]:{
                    ...values[propsObject[0]],
                    [propsObject[1]]:valor
                }
            })
        }else{
            setValues({
                ...values,
                [name]: valor
            });
        }
    }
    const setearValorDomicilio = (name, valor) => {
        setValues({
            ...values,
            domiciliosAfiliados: { ...values.domiciliosAfiliados, [name]: valor }
        });
    }

    const setearValorDomicilio2 = (name, valor, name2, valor2, name3, valor3) => {
        setValues({
            ...values,
            domiciliosAfiliados: { ...values.domiciliosAfiliados, [name]: valor, [name2]: valor2, [name3]: valor3 }
        });
    }

    const setearValorDomicilio3 = (name, valor, name2, valor2, name3, valor3, name4, valor4, name5, valor5, name6, valor6, name7, valor7, name8, valor8, name9, valor9) => {
        setValues({
            ...values,
            domiciliosAfiliados: { ...values.domiciliosAfiliados, [name]: valor, [name2]: valor2, [name3]: valor3, [name4]: valor4, [name5]: valor5, [name6]: valor6, [name7]: valor7, [name8]: valor8, [name9]: valor9 }
        });
    }

    const setearValor2 = (name, valor, name2, valor2, name3, valor3, name4, valor4, name5, valor5, name6, valor6, name7, valor7, name8, valor8) => {
        setValues({
            ...values,
            [name]: valor,
            [name2]: valor2,
            [name3]: valor3,
            [name4]: valor4,
            [name5]: valor5,
            [name6]: valor6,
            [name7]: valor7,
            [name8]: valor8,
        });
    }

    const setearValor3 = (name, valor, name2, valor2, name3, valor3, name4, valor4, name5, valor5, name6, valor6, name7, valor7, name8, valor8) => {
        setValues({
            ...values,
            [name]: valor,
            [name2]: valor2,
            [name3]: valor3,
            [name4]: valor4,
            [name5]: valor5,
            [name6]: valor6,
            [name7]: valor7,
            [name8]: valor8,
        });
    }

    const setearVariosValores = (valores) => {
        setValues({
            ...values,
            ...valores
        })
    }

    //Setear varios valores de una propiedad que es un objeto. Esto seria para evitar usar las funciones como setearValorDomicilio, la 2 o la 3.
    const setearVariosValoresHijos = (padre, valores) => {
        setValues({
            ...values,
            [padre]:{
                ...values[padre],
                ...valores
            }
        })
    }

    return [values, handleInputChange, reset, setearValor, setearValor2, setearValorDomicilio, setearValorDomicilio2, setearValorDomicilio3, setearVariosValores, setearVariosValoresHijos, setearValor3];

}