import { memo, useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { css } from '@emotion/react'
import { useCookies } from 'react-cookie'
import axios, { AxiosError } from 'axios'
import SimpleMde from 'react-simplemde-editor'
import { Box } from '@mui/material'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import 'easymde/dist/easymde.min.css'
import 'highlight.js/styles/github.css'
import { useParams } from 'react-router-dom'
import { Item } from '../../types/api/Item'

const sanitizer = require('markdown-it-sanitizer')
const emoji = require('markdown-it-emoji')
const footnote = require('markdown-it-footnote')
const mark = require('markdown-it-mark')
const deflist = require('markdown-it-deflist')
const checkbox = require('markdown-it-checkbox')
const sub = require('markdown-it-sub')
const container = require('markdown-it-container')

export const Editor: VFC = memo(() => {
  const [markdown, setMarkdown] = useState<string>('')
  const { id } = useParams()
  const cookie = useCookies(['accessToken'])
  const removeCookie = useCookies(['accessToken'])[2]

  useEffect(() => {
    let isMounted = true
    axios
      .get<Item>(`${process.env.REACT_APP_API_URL || 'local'}/items/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie[0].accessToken}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.data.contents) {
            setMarkdown(res.data.contents)
          }
        }
      })
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        if (error.response!.status === 401) {
          removeCookie('accessToken')
        }
      })

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const mdOptions = useMemo(() => {
    return {
      toolbar: false,
      autofocus: true,
      spellChecker: false,
    }
  }, [])

  const onChangeMarkdown = useCallback(
    (value: string) => {
      setMarkdown(value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookie[0].accessToken}`
      const data = {
        contents: value,
      }

      axios
        .patch(`${process.env.REACT_APP_API_URL || 'local'}/items/update/${id}`, data)
        .catch((error: AxiosError<{ additionalInfo: string }>) => {
          console.log(error.response)
        })
    },
    [cookie, id]
  )

  const mdParser = new MarkdownIt({
    html: true,
    typographer: true,
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

  mdParser
    .use(sanitizer)
    .use(emoji)
    .use(footnote)
    .use(mark)
    .use(deflist)
    .use(checkbox)
    .use(sub)
    .use(container, 'info')
    .use(container, 'success')
    .use(container, 'warning')
    .use(container, 'danger')

  const md = mdParser.render(markdown)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', height: '90vh' }}>
      <Box sx={{ width: '50%', height: '90vh' }}>
        <SimpleMde value={markdown} onChange={onChangeMarkdown} options={mdOptions} css={editorStyle} />
      </Box>
      <Box
        css={containerStyle}
        sx={{
          maxHeight: '100%',
          width: '50%',
          border: '1px solid #ddd',
          backgroundColor: '#fff',
          color: '#000',
          overflow: 'scroll',
        }}
        dangerouslySetInnerHTML={{ __html: md }}
      />
    </Box>
  )
})

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
  .editor-statusbar {
    display: none;
  }
`

const containerStyle = css`
  .success {
    margin: 10px 0;
    padding: 10px 10px;
    border-radius: 5px;
    color: #3a6f3a;
    background-color: #daedd2;
  }

  .info {
    margin: 10px 0;
    padding: 10px 10px;
    border-radius: 5px;
    color: #2b6584;
    background-color: #d3eaf6;
  }

  .warning {
    margin: 10px 0;
    padding: 10px 10px;
    border-radius: 5px;
    color: #af9c75;
    background-color: #fcf7df;
  }

  .danger {
    margin: 10px 0;
    padding: 10px 10px;
    border-radius: 5px;
    color: #9f3b3a;
    background-color: #f0d9d9;
  }
`
