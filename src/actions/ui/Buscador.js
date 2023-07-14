import { TextField } from '@material-ui/core';
import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import { Autocomplete } from '@material-ui/lab';
import { fetchConToken } from '../../helpers/fetch';
import { TextValidator } from 'react-material-ui-form-validator';

const Buscador = forwardRef(({ 
  label, fieldsDisabled, value,
  setValue, endpoint, noOptionText,
  getOptionLabel, variant, renderOption,
  filterOptions, validators = null, margin
}, ref) => {

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState([]);

  useImperativeHandle(ref, () => ({
    resetValues: () => {
      setOptions([]);
    }
  }));

  useEffect(() => {
    let active = true;

    setLoading(true);

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      setLoading(false);
      return undefined;
    }

    if(search){
      (async () => {
        const response = await fetchConToken(endpoint(inputValue));
        const contentType = response.headers.get("content-type");
        if (response.ok && contentType && contentType.indexOf("application/json") !== -1) {
          let results = await response.json();
          if(filterOptions){
            results = filterOptions(results);
          }
          if (active) {
            let newOptions = [];
    
            if (value) {
              newOptions = [value];
            }
    
            newOptions = [...newOptions, ...results];
    
            setOptions(newOptions);
            setLoading(false);
          }
        }
      })();
    }
    return () => {
      active = false;
    };
  }, [value, inputValue, search]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      disabled={fieldsDisabled}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      fullWidth
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        setSearch(false); 
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        setSearch(true); 
      }}
      noOptionsText={noOptionText}
      loadingText="Buscando..."
      loading={loading}
      renderInput={(params) => {
        const marginProp = margin ? {margin: "normal"} : {}
        if(validators === null){
          return <TextField {...params} {...marginProp} label={label} variant={variant} fullWidth />
        }else{
          return <TextValidator {...params} {...marginProp} value={value !== null ? inputValue : ""} label={label} variant={variant} fullWidth validators={validators.values} errorMessages={validators.msgs} />
        }
      }}
    />
  )
}
)

export default Buscador;
