import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store'
import { ColorModeProvider } from './context'
import { AppRouter } from './router'
import { Loading } from './components'

export default function App (): JSX.Element {
  return (
    <Provider store={ store }>
      <ColorModeProvider>
        <Suspense fallback={ <Loading /> }>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Suspense>
      </ColorModeProvider>
    </Provider>
  )
}
