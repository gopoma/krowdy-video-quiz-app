import { type FC } from 'react'
import type { Quiz } from '../interfaces'
import { Box, Typography } from '@mui/material'

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
        quizzes.map((quiz) => (
          <Box
            key={ quiz.id }
            component='article'
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              display: 'flex'
            }}
          >
            <Box>
              <img
                src={ quiz.image }
                width={ 300 }
                height={ 200 }
              />
            </Box>
            <Box sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1
            }}>
              <Typography
                variant='h3'
                sx={{
                  fontSize: '1.85em',
                  fontWeight: 'bold',
                  color: 'text.primary'
                }}
              >
                { quiz.name }
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontSize: '1.45em',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: 'text.primary'
                }}
              >
                { quiz.publisher.username }
              </Typography>
            </Box>
          </Box>
        ))
      }
    </Box>
  )
}
