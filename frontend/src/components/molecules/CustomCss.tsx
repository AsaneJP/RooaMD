import { Box } from '@mui/material'
import { Dispatch, memo, ReactElement, SetStateAction, useCallback, useMemo, useState, VFC } from 'react'
import { css } from '@emotion/react'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

type Props = {
  children: ReactElement
  preview: string
  setPreview: Dispatch<SetStateAction<string>>
}

export const CustomCss: VFC<Props> = memo((props) => {
  const { children, preview, setPreview } = props

  const mdOptions = useMemo(() => {
    return {
      toolbar: false,
      autofocus: true,
      spellChecker: false,
    }
  }, [])

  const onChangeMarkdown = useCallback(
    (value: string) => {
      setPreview(value)
    },
    [setPreview]
  )

  return (
    <>
      <Box sx={{ border: '1px solid', margin: '30px 30px 20px 30px' }}>{children}</Box>
      <SimpleMde css={editorStyle} value={preview} onChange={onChangeMarkdown} options={mdOptions} />
    </>
  )
})

const editorStyle = css`
  .CodeMirror {
    margin: 0 auto;
    width: 80%;
    height: 340px;
    overflow-x: scroll;
    border-radius: none;
    margin-bottom: 30px;
  }
  .EasyMDEContainer .CodeMirror {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .editor-statusbar {
    display: none;
  }
`
