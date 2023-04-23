import { type FC } from 'react'
import { Box, Typography } from '@mui/material'
import type { Quiz } from '../interfaces'

interface Props {
  quiz: Quiz
}

export const QuizCard: FC<Props> = ({ quiz }) => {
  const _handleClick = (): void => {
    console.log(quiz.id)
  }

  return (
    <Box
      component='article'
      onClick={ _handleClick }
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
  )
}
