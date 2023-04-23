import { useEffect, type FC, useState } from 'react'

import { QuizzesService } from '../services'
import type { Quiz } from '../interfaces'
import { Layout } from '../layouts'
import { QuizzesList } from '../components'
import { Box, Typography } from '@mui/material'

const quizzesServ = new QuizzesService()

export const VideoQuizzesPage: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>()

  useEffect(() => {
    quizzesServ.getAll()
      .then(setQuizzes)
      .catch(console.log)
  }, [])

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
          Video Cuestionarios
        </Typography>
      </Box>

      <>{(quizzes !== undefined) && (<QuizzesList quizzes={quizzes} />)}</>
    </Layout>
  )
}

export default VideoQuizzesPage
