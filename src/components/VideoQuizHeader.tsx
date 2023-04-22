import { Box, Typography } from '@mui/material'
import { type FC } from 'react'

export const VideoQuizHeader: FC = () => {
  return (
    <Box component='header'>
      <Typography
        sx={{
          fontSize: '1.85em',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Nostalgia
      </Typography>
    </Box>
  )
}
