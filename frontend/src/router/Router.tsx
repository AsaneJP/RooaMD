import { memo, VFC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components/templates/Layout'

export const Router: VFC = memo(() => (
  <Routes>
    <Route path="/" element={
      <Layout title='Index'>
        <p>Index</p>
      </Layout>
    } />
  </Routes>
))
