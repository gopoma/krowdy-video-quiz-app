import { ColorModeProvider } from './context'
import { VideoQuiz } from './pages'

export default function App (): JSX.Element {
  return (
    <ColorModeProvider>
      <VideoQuiz />
    </ColorModeProvider>
  )
}
