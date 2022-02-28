import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { useCookies } from 'react-cookie'
import SimpleMde from 'react-simplemde-editor'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { Folder } from '../../types/api/Folder'
import 'easymde/dist/easymde.min.css'
import { CustomCss } from '../molecules/CustomCss'

export const FolderSetting = () => {
  const { id } = useParams()
  const [header1, setHeader1] = useState('')
  const [header2, setHeader2] = useState('')
  const [header3, setHeader3] = useState('')
  const [header4, setHeader4] = useState('')
  const [header5, setHeader5] = useState('')
  const [header6, setHeader6] = useState('')
  const cookie = useCookies(['accessToken'])
  const removeCookie = useCookies(['accessToken'])[2]

  useEffect(() => {
    let isMounted = true
    axios
      .get<Folder>(`${process.env.REACT_APP_API_URL || 'local'}/folders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie[0].accessToken}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.data.header1 != null) {
            setHeader1(res.data.header1)
          }
          if (res.data.header2 != null) {
            setHeader2(res.data.header2)
          }
          if (res.data.header3 != null) {
            setHeader3(res.data.header3)
          }
          if (res.data.header4 != null) {
            setHeader4(res.data.header4)
          }
          if (res.data.header5 != null) {
            setHeader5(res.data.header5)
          }
          if (res.data.header6 != null) {
            setHeader6(res.data.header6)
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

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${cookie[0].accessToken}`
    const data = {
      header1,
      header2,
      header3,
      header4,
      header5,
      header6,
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL || 'local'}/folders/update/${id}`, data)
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        // eslint-disable-next-line no-console
        console.log(error.response)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, header1, header2, header3, header4, header5, header6])

  return (
    <Box sx={{ width: '100%' }}>
      <CustomCss preview={header1} setPreview={setHeader1}>
        <h1
          css={css`
            ${header1}
          `}
        >
          H1 Title
        </h1>
      </CustomCss>
      <CustomCss preview={header2} setPreview={setHeader2}>
        <h2
          css={css`
            ${header2}
          `}
        >
          H2 Title
        </h2>
      </CustomCss>
      <CustomCss preview={header3} setPreview={setHeader3}>
        <h3
          css={css`
            ${header3}
          `}
        >
          H3 Title
        </h3>
      </CustomCss>
      <CustomCss preview={header4} setPreview={setHeader4}>
        <h4
          css={css`
            ${header4}
          `}
        >
          H4 Title
        </h4>
      </CustomCss>
      <CustomCss preview={header5} setPreview={setHeader5}>
        <h5
          css={css`
            ${header5}
          `}
        >
          H5 Title
        </h5>
      </CustomCss>
      <CustomCss preview={header6} setPreview={setHeader6}>
        <h4
          css={css`
            ${header6}
          `}
        >
          H6 Title
        </h4>
      </CustomCss>
    </Box>
  )
}
