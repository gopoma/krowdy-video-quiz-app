import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import type { Question } from '../interfaces'
import { useQuizzes } from '../hooks'

interface Props {
  question: Question
}

export const VideoQuestionCard: FC<Props> = ({ question }) => {
  const { activeAnswer } = useQuizzes()
  const navigate = useNavigate()

  const _handleClick = (): void => {
    navigate(`/quizzes/current/questions?order=${question.order}`)
  }

  return (
    <Box
      component='article'
      sx={{
        width: '100%',
        maxWidth: '280px',
        margin: 'auto',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}
    >
      <Box
        component='section'
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '22rem',
          backgroundColor: '#000'
        }}
      >
        {
          (activeAnswer.some((answer) => answer.question.id === question.id))
            ? <video
                src={ activeAnswer.find((answer) => answer.question.id === question.id)?.videoAnswerURL }
                controls
                playsInline
                style={{
                  width: '100%',
                  minHeight: '22rem'
                }}
              ></video>
            : <></>
        }
        <IconButton
          onClick={ _handleClick }
          sx={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            bgcolor: 'secondary.main',
            ':hover': {
              backgroundColor: 'red',
              color: '#FFF'
            }
          }}
        >
          <PlayArrowIcon />
        </IconButton>
      </Box>
      <Box
        component='section'
        sx={{
          p: 2
        }}
      >
        <Typography
          sx={{ fontSize: '1.25em' }}
        >
          { question.statement }
        </Typography>
      </Box>
    </Box>
  )
}
