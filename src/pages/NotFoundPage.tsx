import { Box, Typography } from '@mui/material'
import { type FC } from 'react'

export const NotFoundPage: FC = () => {
  return (
    <Box
      component='section'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        variant='h2'
        sx={{
          p: 4,
          fontSize: '1.85em',
          fontWeight: 'bold'
        }}
      >
        The resource that you&apos;re looking for doesn&apos;t exist or is not available at the moment
      </Typography>
    </Box>
  )
}

export default NotFoundPage
