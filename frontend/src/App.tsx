import { VFC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { RecoilRoot } from 'recoil'
import { Router } from './router/Router'
import './App.css'

const App: VFC = () => (
  <CookiesProvider>
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  </CookiesProvider>
)

export default App
