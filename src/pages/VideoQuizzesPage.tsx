import { useEffect, type FC, useState } from 'react'

import { QuizzesService } from '../services'
import type { Quiz } from '../interfaces'
import { Layout } from '../layouts'
import { QuizzesList } from '../components'

const quizzesServ = new QuizzesService()

export const VideoQuizzesPage: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>()

  useEffect(() => {
    quizzesServ.getAll()
      .then(setQuizzes)
      .catch(console.log)
  }, [])

  return (
    <Layout>
      <h2>VideoQuizzesPage works!</h2>

      <>{(quizzes !== undefined) && (<QuizzesList quizzes={quizzes} />)}</>
    </Layout>
  )
}

export default VideoQuizzesPage
