import type { Quiz } from '../interfaces'
import { sleep } from '../helpers'
import { quizzes } from '../mocks'

export class QuizzesService {
  async getAll (): Promise<Quiz[]> {
    await sleep(750)

    return await Promise.resolve(quizzes)
  }
}
