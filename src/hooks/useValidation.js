import { useState,useEffect } from "react";
export const useValidation = (initialState = {}) => {
  const [valuesValidation, setValuesValidation] = useState({});
  const [values, setValues] = useState(initialState);
  const resetValidation = (newFormState = initialState) => {
    setValues(newFormState);
  };

  //const dispatch = useDispatch();
  // useEffect(() => {
  //   const {apellido_y_nombre,fecha_nacimiento,codigo_postal,mail,sexo,telefono} = values;
  //   if (mail===''){
  //       setValuesValidation({
  //         ...valuesValidation,
  //         ['mail']: true,
  //       });

  //   }else{
  //     setValuesValidation({
  //       ...valuesValidation,
  //         ['mail']: false,
  //       });
  //   }
  //   if (telefono===''){
  //     setValuesValidation({
  //       ...valuesValidation,
  //       ['telefono']: true,
  //     });

  // }else{
  //   setValuesValidation({
  //     ...valuesValidation,
  //       'telefono': false,
  //     });
  // }
  //   if (sexo === ''){
  //     setValuesValidation({
  //         'sexo': true,
  //       });
  //   }else{ setValuesValidation({
  //     'sexo': false,
  //   });}
  //   if (apellido_y_nombre === ''){
  //     setValuesValidation({
  //         'apellido_y_nombre': true,
  //       });
  //   }else{setValuesValidation({
  //     'apellido_y_nombre': false,
  //   });}
  //   if (fecha_nacimiento === ''){
  //     setValuesValidation({
  //         'fecha_nacimiento': true,
  //       });
  //   }else{ setValuesValidation({
  //     'fecha_nacimiento': false,
  //   });}
  //   if (codigo_postal === ''){
  //     setValuesValidation({
  //         'codigo_postal': true,
  //       });
  //   }else{setValuesValidation({
  //     'codigo_postal': false,
  //   });}

  //}, [values])

  useEffect(() => {
    let obj={};
    let i=0;
    for (var key of Object.keys(values)) {
      if((key==='apellido_y_nombre' && values[key]==='') || (key==='domicilio' && values[key]==='') || (key==='telefono' && values[key]==='') || (key==='celular' && values[key]==='')){
        obj[key] = true;
        i++;
      }
    }
    if(i>0){
      setValuesValidation(obj);
    }
  }, [values]);


  const handleInputChangeValidation = ({ target }) => {
    if (target.value === "") {
        setValuesValidation({
        ...valuesValidation,
        [target.name]: true,
      });
    } else {
        setValuesValidation({
        ...valuesValidation,
        [target.name]: false,
      });
    }
  };

  const setearValorValidation = (name, valor) => {
    setValuesValidation({
      ...valuesValidation,
      [name]: valor,
    });
  };

  const setearVariasValidations=(valores)=>{
    setValuesValidation({
        ...valuesValidation,
        ...valores
    })
}

  return [
    valuesValidation,
    handleInputChangeValidation,
    resetValidation,
    setearValorValidation,
    setearVariasValidations
  ];
};
