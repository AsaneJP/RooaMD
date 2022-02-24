import { Alert, Snackbar } from '@mui/material'
import { memo, useState, VFC } from 'react'

type Props = {
  children: string
  type: 'error' | 'success' | 'warning' | 'info'
  openMsg: boolean
}

export const AleartMsg: VFC<Props> = memo((props) => {
  const { children, type, openMsg } = props
  const [open, setOpen] = useState(openMsg)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  )
})
