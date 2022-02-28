import { memo, VFC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Editor } from '../components/pages/Editor'
import { FolderSetting } from '../components/pages/FolderSetting'
import { Index } from '../components/pages/Index'
import { Setting } from '../components/pages/Setting'
import { SignIn } from '../components/pages/SignIn'
import { SignUp } from '../components/pages/SignUp'
import { User } from '../components/pages/User'
import { Layout } from '../components/templates/Layout'
import { AuthGuard } from './AuthGuard'

export const Router: VFC = memo(() => (
  <Routes>
    <Route
      path="/"
      element={
        <AuthGuard title="Home">
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
      path="/folder/:id"
      element={
        <AuthGuard title="Folder">
          <FolderSetting />
        </AuthGuard>
      }
    />

    <Route
      path="/user"
      element={
        <AuthGuard title="Folder">
          <User />
        </AuthGuard>
      }
    />

    <Route
      path="/setting"
      element={
        <AuthGuard title="Setting">
          <Setting />
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
