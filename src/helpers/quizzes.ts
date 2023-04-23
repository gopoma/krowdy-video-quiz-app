import type { Quiz } from '../interfaces'
import { quizzes } from '../mocks'

export const getQuizById = (id: number): Quiz | null => {
  return quizzes.find((quiz) => quiz.id === id) ?? null
}
