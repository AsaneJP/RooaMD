import { Box, Button, Typography } from '@mui/material'
import { VFC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { addContentState } from '../../globalState/addContentState'
import { InputText } from '../atom/InputText'
import { ModalWindow } from '../atom/ModalWindow'
import { listCheckState } from '../../globalState/listCheckState'

type Props = {
  judge: boolean
}

type FormData = {
  name: string
}

const schema = yup.object().shape({
  name: yup.string().required('名前の入力は必須です'),
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const AddContent: VFC<Props> = (props) => {
  const { judge } = props
  const setOpen = useSetRecoilState(addContentState)
  const selectedIndex = useRecoilValue(listCheckState)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (inData: FormData) => {
    console.log(inData)
    reset({ name: '' })
  }

  const handleClose = () => {
    reset({ name: '' })
    setOpen(false)
  }

  return (
    <ModalWindow>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {judge ? '新規フォルダー' : '新規ファイル'}
        </Typography>
        <InputText
          id="name"
          label="Add Name"
          required
          error={'name' in errors}
          type="text"
          helperText={errors.name?.message}
          register={register('name')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ marginRight: '10px' }}>
            キャンセル
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
            新規作成
          </Button>
        </Box>
      </Box>
    </ModalWindow>
  )
}
