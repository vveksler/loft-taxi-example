import React from 'react'
import TextField from '@material-ui/core/TextField'

export default ({
  type,
  name,
  label,
  input,
  placeholder,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={placeholder ? placeholder : label}
    type={type}
    error={touched && error && true}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)
