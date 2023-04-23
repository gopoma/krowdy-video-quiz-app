import { type FC } from 'react'
import { Typography } from '@mui/material'

export const Loading: FC = () => {
  return (
    <Typography
      variant='h2'
      sx={{
        p: 4,
        fontSize: '1.85em',
        fontWeight: 'bold'
      }}
    >
      Loading...
    </Typography>
  )
}
