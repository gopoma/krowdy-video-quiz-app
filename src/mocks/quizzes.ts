import type { Quiz } from '../interfaces'
import { users } from './users'

export const quizzes: Quiz[] = [
  {
    id: 1,
    name: 'Programming Languages',
    image: 'https://spectrum.ieee.org/media-library/an-illustration-with-people-typing-on-laptop-surrounded-by-floating-windows.jpg?id=31173894&width=1200&height=600&coordinates=0%2C375%2C0%2C375',
    publisher: users[1],
    questions: [
      {
        id: 1,
        order: 1,
        statement: 'How well was your first experiencie with programming languages?'
      },
      {
        id: 2,
        order: 3,
        statement: 'Have you ever programmed in C/C++?'
      },
      {
        id: 3,
        order: 2,
        statement: 'What are your favorite programming languages?'
      },
      {
        id: 4,
        order: 5,
        statement: 'Do you beleive that with 10\'000 hours you will be a master in something?'
      },
      {
        id: 5,
        order: 4,
        statement: 'How do you feel about stress?'
      }
    ]
  },
  {
    id: 2,
    name: 'Akashic Records',
    image: 'https://i.ytimg.com/vi/U7w79Kl7YXI/maxresdefault.jpg',
    publisher: users[2],
    questions: []
  },
  {
    id: 3,
    name: 'Eleos',
    publisher: users[1],
    image: 'https://i.ytimg.com/vi/JxbZfDMFe9U/maxresdefault.jpg',
    questions: []
  }
]
