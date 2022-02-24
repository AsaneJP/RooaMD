import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import { memo, VFC } from 'react'

type Props = {
  id: string
  name: string
  label: string
  error: boolean
  helperText: string | undefined
  register: UseFormRegisterReturn
}

export const InputCheckBox: VFC<Props> = memo((props) => {
  const { id, label, helperText, register, error } = props
  return (
    <FormControl required error={error}>
      <FormControlLabel control={<Checkbox id={id} {...register} />} label={label} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
})
