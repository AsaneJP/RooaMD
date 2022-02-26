import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useCookies } from 'react-cookie'
import { Folder } from '../types/api/Folder'
import { Item } from '../types/api/Item'

export const useGetContent = () => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [items, setItems] = useState<Item[]>([])
  const cookie = useCookies(['accessToken'])

  useEffect(() => {
    let isMounted = true
    axios
      .get<Array<Folder>>(`${process.env.REACT_APP_API_URL || 'local'}/folders`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie[0].accessToken}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          setFolders(res.data)
        }
      })
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        // eslint-disable-next-line no-console
        console.log(error.message)
      })

    return () => {
      isMounted = false
    }
  }, [folders, cookie])

  useEffect(() => {
    let isMounted = true
    axios
      .get<Array<Item>>(`${process.env.REACT_APP_API_URL || 'local'}/items`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie[0].accessToken}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          setItems(res.data)
        }
      })
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        // eslint-disable-next-line no-console
        console.log(error.message)
      })

    return () => {
      isMounted = false
    }
  }, [items, cookie])

  return {folders, items}
}
