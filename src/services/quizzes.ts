import type { Quiz } from '../interfaces'
import { sleep, getQuizById } from '../helpers'
import { quizzes } from '../mocks'

export class QuizzesService {
  async getAll (): Promise<Quiz[]> {
    await sleep(750)

    return await Promise.resolve(quizzes)
  }

  async getById (id: number): Promise<Quiz | null> {
    await sleep(750)

    return await Promise.resolve(getQuizById(id))
  }
}
