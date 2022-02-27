import { memo, VFC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Editor } from '../components/pages/Editor'
import { Index } from '../components/pages/Index'
import { SignIn } from '../components/pages/SignIn'
import { SignUp } from '../components/pages/SignUp'
import { Layout } from '../components/templates/Layout'
import { AuthGuard } from './AuthGuard'

export const Router: VFC = memo(() => (
  <Routes>
    <Route
      path="/"
      element={
        <AuthGuard title="Top Page">
          <Index />
        </AuthGuard>
      }
    />
    <Route
      path="/editor/:id"
      element={
        <AuthGuard title="Editor">
          <Editor />
        </AuthGuard>
      }
    />

    <Route
      path="/signin"
      element={
        <Layout title="Sign In">
          <SignIn />
        </Layout>
      }
    />
    <Route
      path="/signup"
      element={
        <Layout title="Sign Up">
          <SignUp />
        </Layout>
      }
    />
  </Routes>
))
