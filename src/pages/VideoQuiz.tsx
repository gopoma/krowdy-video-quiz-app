import { type FC } from 'react'
import { Layout } from '../layouts'
import { Box } from '@mui/material'
import { VideoQuestion, VideoQuizHeader, VideoQuizSubmitButton } from '../components'

export const VideoQuiz: FC = () => {
  return (
    <Layout>
      <VideoQuizHeader />

      <Box
        component='section'
        sx={{
          display: 'grid',
          gap: '1.25rem',
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
