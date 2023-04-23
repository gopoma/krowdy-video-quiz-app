import { type FC, useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { QuizzesService } from '../services'
import type { Quiz } from '../interfaces'
import { Layout } from '../layouts'
import {
  Loading,
  VideoQuestion,
  VideoQuizSubmitButton
} from '../components'

const quizzesServ = new QuizzesService()

export const VideoQuizPage: FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    quizzesServ.getById(Number.parseInt(id as string))
      .then((quiz) => {
        setQuiz(quiz)
        setLoading(false)
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

      <Box
        component='section'
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
        }}
      >
        <VideoQuestion />
        <VideoQuestion />
        <VideoQuestion />
        <VideoQuestion />
      </Box>

      <Box
        component='section'
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <VideoQuizSubmitButton />
      </Box>
    </Layout>
  )
}

export default VideoQuizPage
