import { type FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './'

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='/quizzes' /> } />

      {
        routes.map(({ path, Component }) => (
          <Route
            key={ path }
            path={ path }
            element={ <Component /> }
          />
        ))
      }

      <Route path='/*' element={ <Navigate to='/404' replace /> } />
    </Routes>
  )
}
