import { TextField } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import { VFC } from 'react'

type Props = {
  id: string
  label: string
  required: boolean
  helperText: string | undefined
  error: boolean
  register: UseFormRegisterReturn
  type: string
}

export const InputText: VFC<Props> = (props) => {
  const { id, label, error, helperText, required, register, type } = props
  return (
    <TextField
      margin="normal"
      required={required}
      type={type}
      fullWidth
      id={id}
      label={label}
      error={error}
      helperText={helperText}
      {...register}
    />
  )
}
