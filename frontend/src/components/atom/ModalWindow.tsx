import { memo, ReactElement, VFC } from 'react'
import Modal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { addContentState } from '../../globalState/addContentState'

type Props = {
  children: ReactElement
}

export const ModalWindow: VFC<Props> = memo((props) => {
  const { children } = props
  const [open, setOpen] = useRecoilState(addContentState)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  )
})
