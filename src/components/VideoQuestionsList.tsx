import { type FC } from 'react'
import { Box } from '@mui/material'

import type { Question } from '../interfaces'
import { VideoQuestionCard } from './'

interface Props {
  questions: Question[]
}

export const VideoQuestionsList: FC<Props> = ({ questions }) => {
  return (
    <Box
      component='section'
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
      }}
    >
      {
        questions.map((question) => (
          <VideoQuestionCard key={ question.id } question={ question } />
        ))
      }
    </Box>
  )
}
