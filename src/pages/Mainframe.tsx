import { type FC } from 'react'
import { Box } from '@mui/material'
import { Layout } from '../layouts'

export const Mainframe: FC = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'text.primary',
          borderRadius: 1,
          p: 3
        }}
      >
      </Box>
    </Layout>
  )
}
