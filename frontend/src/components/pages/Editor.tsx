import { useCallback, useState, VFC } from 'react'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { Box } from '@mui/material'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import MarkdownIt from 'markdown-it'

const sanitizer = require('markdown-it-sanitizer')
const emoji = require('markdown-it-emoji');

export const Editor: VFC = () => {
  const [markdown, setMarkdown] = useState<string>('# Hello, world! :smile:')

  const onChangeMarkdown = useCallback((value: string) => {
    setMarkdown(value)
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
    <Box>
      <SimpleMde value={markdown} onChange={onChangeMarkdown} />
      <Box dangerouslySetInnerHTML={{ __html: md }} />
    </Box>
  )
}
