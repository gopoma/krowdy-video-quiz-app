import { useAppDispatch, useAppSelector } from './useStore'
import type { Quiz } from '../interfaces'
import { onSetActiveQuiz } from '../store'
import { useEffect } from 'react'

// eslint-disable-next-line
export const useQuizzes = () => {
  const dispatch = useAppDispatch()
  const { activeQuiz } = useAppSelector((state) => state.quizzes)

  useEffect(() => {
    localStorage.setItem('active-quiz', JSON.stringify(activeQuiz))
  }, [activeQuiz])

  const setActiveQuiz = (quiz: Quiz): void => {
    dispatch(onSetActiveQuiz(quiz))
  }

  return {
    ...activeQuiz,
    activeQuiz,
    setActiveQuiz
  }
}
