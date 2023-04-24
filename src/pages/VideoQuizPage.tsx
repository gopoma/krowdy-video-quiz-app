import { type FC, useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { QuizzesService } from '../services'
import type { Quiz } from '../interfaces'
import { Layout } from '../layouts'
import {
  Loading,
  VideoQuestionsList,
  VideoQuizSubmitButton
} from '../components'
import { useQuizzes } from '../hooks'

const quizzesServ = new QuizzesService()

export const VideoQuizPage: FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const { setActiveQuiz } = useQuizzes()

  useEffect(() => {
    quizzesServ.getById(Number.parseInt(id as string))
      .then((quiz) => {
        setQuiz(quiz)
        setLoading(false)
        setActiveQuiz(quiz as Quiz)
      })
      .catch(console.log)
  }, [])

  const navigate = useNavigate()

  const onNavigateBack = (): void => {
    navigate('/quizzes')
  }

  if (loading) {
    return <Loading />
  }

  if (quiz === null) {
    return <Navigate to='/404' replace />
  }

  return (
    <Layout>
      <Box
        component='header'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontSize: '1.85em',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          { quiz.name }
        </Typography>
        <IconButton
          onClick={ onNavigateBack }
          sx={{
            bgcolor: 'primary.main',
            ':hover': {
              backgroundColor: 'secondary.main'
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {
        (quiz.questions.length === 0)
          ? <Typography
            variant='h3'
            sx={{
              p: 2,
              fontSize: '1.45em',
              textAlign: 'center'
            }}
          >
            There are no questions at the moment
          </Typography>
          : <VideoQuestionsList questions={ quiz.questions } />
      }

      <Box
        component='section'
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <VideoQuizSubmitButton disabled={ quiz.questions.length === 0 } />
      </Box>
    </Layout>
  )
}

export default VideoQuizPage
