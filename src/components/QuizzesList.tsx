import { type FC } from 'react'
import type { Quiz } from '../interfaces'

interface Props {
  quizzes: Quiz[]
}

export const QuizzesList: FC<Props> = ({ quizzes }) => {
  return (
    <>
      <h2>QuizzesList works!</h2>
    </>
  )
}
