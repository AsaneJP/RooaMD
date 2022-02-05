import { VFC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Router } from './router/Router'

const App: VFC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </RecoilRoot>
)

export default App
