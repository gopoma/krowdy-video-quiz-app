import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ColorModeProvider } from './context'
import { AppRouter } from './router'
import { Loading } from './components'

export default function App (): JSX.Element {
  return (
    <ColorModeProvider>
      <Suspense fallback={ <Loading /> }>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </ColorModeProvider>
  )
}
