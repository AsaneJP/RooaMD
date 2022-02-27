import { memo, ReactElement, VFC } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'
import { Layout } from '../components/templates/Layout'

type Props = {
  title: string
  children: ReactElement
}

export const AuthGuard: VFC<Props> = memo((props) => {
  const { children, title } = props

  const cookie = useCookies(['accessToken'])

  if (cookie[0].accessToken === undefined) {
    return <Navigate to="/signin" />
  }
  return <Layout title={title}>{children}</Layout>
})
