import { type FC, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, IconButton, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { ColorModeContext } from '../context'

export const Mainframe: FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3
      }}
    >
      <Typography variant='h1' fontSize={25} fontWeight='bold'>
        {theme.palette.mode} mode
      </Typography>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}
