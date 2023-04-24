import { useAppDispatch, useAppSelector } from './useStore'
import type { Quiz } from '../interfaces'
import { onSetActiveQuiz } from '../store'

// eslint-disable-next-line
export const useQuizzes = () => {
  const dispatch = useAppDispatch()
  const { activeQuiz } = useAppSelector((state) => state.quizzes)

  const setActiveQuiz = (quiz: Quiz): void => {
    dispatch(onSetActiveQuiz(quiz))
  }

  return {
    ...activeQuiz,
    activeQuiz,
    setActiveQuiz
  }
}
