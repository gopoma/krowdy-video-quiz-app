import { type FC } from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  counter: number
}

export const VideoCounter: FC<Props> = ({ counter }) => {
  return (
    <Box
      component='section'
      sx={{
        zIndex: 25,
        position: 'absolute',
        top: '0.85rem',
        right: '0.85rem',
        bgcolor: 'primary.main'
      }}
    >
      <Typography
        sx={{
          p: 1,
          fontSize: '1.25em',
          fontWeight: 'bold',
          color: 'text.primary'
        }}
      >
        Counter: { counter }
      </Typography>
    </Box>
  )
}
