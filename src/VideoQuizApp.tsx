import { ColorModeProvider } from './context'
import { VideoQuizPage } from './pages'

export default function App (): JSX.Element {
  return (
    <ColorModeProvider>
      <VideoQuizPage />
    </ColorModeProvider>
  )
}
