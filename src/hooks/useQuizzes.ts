import { useAppDispatch, useAppSelector } from './useStore'
import type { QuestionAnswer, Quiz } from '../interfaces'
import { onSetActiveQuiz, onAddAnswer } from '../store'
import { useEffect, useMemo } from 'react'

// eslint-disable-next-line
export const useQuizzes = () => {
  const dispatch = useAppDispatch()
  const { activeQuiz, activeAnswer } = useAppSelector((state) => state.quizzes)

  const completed = useMemo(() => activeAnswer.length === activeQuiz?.questions.length, [activeAnswer.length])
  const minPosition = useMemo(() => activeQuiz?.questions?.[0]?.order, [activeQuiz])
  const maxPosition = useMemo(() => activeQuiz?.questions?.[activeQuiz?.questions?.length - 1]?.order, [activeQuiz])

  useEffect(() => {
    localStorage.setItem('active-quiz', JSON.stringify(activeQuiz))
  }, [activeQuiz])

  const setActiveQuiz = (quiz: Quiz): void => {
    dispatch(onSetActiveQuiz(quiz))
  }

  const addAnswer = (answer: QuestionAnswer): void => {
    dispatch(onAddAnswer(answer))
  }

  return {
    ...activeQuiz,
    activeQuiz,
    activeAnswer,
    completed,
    minPosition,
    maxPosition,

    setActiveQuiz,
    addAnswer
  }
}
