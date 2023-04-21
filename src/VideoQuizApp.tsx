import { ColorModeProvider } from './context'
import { Mainframe } from './pages'

export default function App (): JSX.Element {
  return (
    <ColorModeProvider>
      <Mainframe />
    </ColorModeProvider>
  )
}
