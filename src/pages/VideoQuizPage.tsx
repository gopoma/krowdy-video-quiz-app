import { useMemo, type FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { getQuizById } from '../helpers'
import { Layout } from '../layouts'
import {
  VideoQuestion,
  VideoQuizSubmitButton
} from '../components'

export const VideoQuizPage: FC = () => {
  const { id } = useParams()
  const quiz = useMemo(() => getQuizById(Number.parseInt(id as string)), [])

  const navigate = useNavigate()

  const onNavigateBack = (): void => {
    navigate('/quizzes')
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
