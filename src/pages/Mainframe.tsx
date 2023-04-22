import { type FC } from 'react'
import { Layout } from '../layouts'
import { VideoQuestion } from '../components'
import { Box } from '@mui/material'

export const Mainframe: FC = () => {
  return (
    <Layout>
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
    </Layout>
  )
}
