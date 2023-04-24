import { useMemo, type FC } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useQuizzes } from '../hooks'
import type { Question } from '../interfaces'
import { Layout } from '../layouts'

export const VideoQuestionPage: FC = () => {
  const location = useLocation()
  const { order = '' } = queryString.parse(location.search)
  const { id: idQuiz, questions } = useQuizzes()
  const navigate = useNavigate()

  const onNavigateBack = (): void => {
    navigate(`/quizzes/${idQuiz as number}`)
  }

  const question = useMemo(() => (questions as Question[]).find((question) => question.order === Number.parseInt(order as string)) ?? null, [])
  console.log(question)

  if (question === null) {
    return <Navigate to={ `/quizzes/${idQuiz as number}` } />
  }

  return (
    <Layout>
      <Box component='section'>
        <Button
          variant='contained'
          onClick={ onNavigateBack }
          sx={{
            display: 'flex',
            gap: '0.45rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ArrowBackIcon />
          <Typography
            sx={{
              fontSize: '0.85em',
              fontWeight: 'bold'
            }}
          >
            Volver
          </Typography>
        </Button>
      </Box>

      <Box
        component='section'
        sx={{ height: '65vh' }}
      >
        <Box
          component='section'
          sx={{
            height: '85%',
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#000'
          }}
        >
          xd
        </Box>
        <Box
          component='section'
          sx={{
            height: '8%',
            borderRadius: '0 0 8px 8px',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'primary.main'
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontSize: '1.25em',
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            { question.statement }
          </Typography>
        </Box>
      </Box>

      <Box
        component='section'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button
          variant='contained'
        >
          Atrás
        </Button>
        <Button
          variant='contained'
        >
          Siguiente
        </Button>
      </Box>
    </Layout>
  )
}

export default VideoQuestionPage
