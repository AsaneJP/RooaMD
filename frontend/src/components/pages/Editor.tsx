import { memo, useCallback, useMemo, useState, VFC } from 'react'
import SimpleMde from 'react-simplemde-editor'
import { Box } from '@mui/material'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import { css } from '@emotion/react'
import 'easymde/dist/easymde.min.css'
import 'highlight.js/styles/github.css'

const sanitizer = require('markdown-it-sanitizer')
const emoji = require('markdown-it-emoji')

const editorStyle = css`
  .CodeMirror {
    height: 90vh;
    width: 100%;
    border-radius: none;
  }
  .EasyMDEContainer .CodeMirror {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .editor-statusbar{
    display: none;
  }
`

export const Editor: VFC = memo(() => {
  const [markdown, setMarkdown] = useState<string>('# Hello, world! :smile:')

  const onChangeMarkdown = useCallback((value: string) => {
    setMarkdown(value)
  }, [])

  const mdOptions = useMemo(() => {
    return {
      toolbar: false,
      autofocus: true,
      spellChecker: false,
    }
  }, [])

  const mdParser = new MarkdownIt({
    breaks: true,
    linkify: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
      return ''
    },
  })

  mdParser.use(sanitizer).use(emoji)

  const md = mdParser.render(markdown)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', height: "90vh"}}>
      <Box sx={{ width: "50%", height: "90vh" }}>
        <SimpleMde value={markdown} onChange={onChangeMarkdown} options={mdOptions} css={editorStyle} />
      </Box>
      <Box
        sx={{
          maxHeight: "100%",
          width: '50%',
          border: '1px solid #ddd',
          backgroundColor: "#fff",
          color: "#000",
        }}
        dangerouslySetInnerHTML={{ __html: md }}
      />
    </Box>
  )
})
