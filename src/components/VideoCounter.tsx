import { type FC } from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  counter: number
}

export const VideoCounter: FC<Props> = ({ counter }) => {
  let s = counter
  const minutes = Number.parseInt(String(s / 60))
  s %= 60
  const seconds = s
  const secondsHasOneDigit = String(s).length === 1

  return (
    <Box
      component='section'
      sx={{
        zIndex: 25,
        position: 'absolute',
        top: '0.85rem',
        right: '0.85rem',
        borderRadius: '8px 8px 8px 8px',
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
        { minutes }:{ (secondsHasOneDigit) ? '0' : '' }{ seconds } / 2:00
      </Typography>
    </Box>
  )
}
