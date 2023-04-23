import { lazy, type FC, type LazyExoticComponent } from 'react'

interface Route {
  path: string
  Component: LazyExoticComponent<FC> | FC
}

const NotFoundPage = lazy(async () => await import('../pages/NotFoundPage'))
const VideoQuizzesPage = lazy(async () => await import('../pages/VideoQuizzesPage'))
const VideoQuizPage = lazy(async () => await import('../pages/VideoQuizPage'))

export const routes: Route[] = [
  {
    path: '404',
    Component: NotFoundPage
  },
  {
    path: 'quizzes',
    Component: VideoQuizzesPage
  },
  {
    path: 'quizzes/:id',
    Component: VideoQuizPage
  }
]
