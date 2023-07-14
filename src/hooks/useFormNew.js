import { useState } from 'react';

export const useFormNew = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    }

    const handleInputChange = ({ target }) => {
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

    const setFormValues = (valores) => {
        setValues({
            ...values,
            ...valores
        })
    }

    return {formValues: values, setFormValues, reset, handleInputChange, setearValor};

}