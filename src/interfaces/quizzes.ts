import type { Question, User } from './'

export interface Quiz {
  id: number
  name: string
  image: string
  publisher: User
  questions: Question[]
}
