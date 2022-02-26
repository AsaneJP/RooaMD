import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import { memo, useState, VFC } from 'react'
import { useCookies } from 'react-cookie'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { addContentState } from '../../globalState/addContentState'
import { InputText } from '../atom/InputText'
import { ModalWindow } from '../atom/ModalWindow'
import { listCheckState } from '../../globalState/listCheckState'
import { AleartMsg } from '../atom/AleartMsg'

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

export const AddContent: VFC<Props> = memo((props) => {
  const { judge } = props
  const setOpen = useSetRecoilState(addContentState)
  const selectedIndex = useRecoilValue(listCheckState)
  const cookie = useCookies(['accessToken'])
  const [msg, setMsg] = useState<'error' | 'success' | 'warning' | 'info' | 'default'>('default')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  let parentId: string | null = null
  if (selectedIndex === 'setting' || selectedIndex === 'user' || selectedIndex === 'default') {
    parentId = null
  } else {
    const [parent, child] = selectedIndex.split('/')
    const [childId, ext] = child.split('.')

    if (parent === '.') {
      if (ext === 'md') {
        parentId = null
      } else {
        parentId = childId
      }
    } else if (ext === 'md') {
      parentId = parent
    } else {
      parentId = childId
    }
  }

  const onSubmit = (inData: FormData) => {
    if (cookie[0].accessToken !== undefined) {
      let path = ''
      if (judge) {
        path = 'folders'
      } else {
        path = 'items'
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookie[0].accessToken}`
      const data = {
        name: inData.name,
        parentId,
      }

      axios
        .post(`${process.env.REACT_APP_API_URL || 'local'}/${path}`, data)
        .then((res) => {
          console.log(res)
          setMsg('success')
        })
        .catch((error) => {
          console.log(error)
          setMsg('error')
        })
    }
    reset({ name: '' })
    setOpen(false)
  }

  const handleClose = () => {
    reset({ name: '' })
    setOpen(false)
  }

  return (
    <>
      {msg !== 'default' && (
        <AleartMsg openMsg type={msg}>
          {msg === 'success' ? '追加しました' : '予期せぬエラーが発生しました'}
        </AleartMsg>
      )}
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
    </>
  )
})
