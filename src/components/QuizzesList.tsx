import { type FC } from 'react'
import type { Quiz } from '../interfaces'
import { Box } from '@mui/material'
import { QuizCard } from '.'

interface Props {
  quizzes: Quiz[]
}

export const QuizzesList: FC<Props> = ({ quizzes }) => {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        cursor: 'pointer'
      }}
    >
      {
        quizzes.map((quiz) => (<QuizCard key={ quiz.id } quiz={ quiz } />))
      }
    </Box>
  )
}
