import { type FC, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { AppBar, Typography, IconButton } from '@mui/material'

import { ColorModeContext } from '../context'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export const Navbar: FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <AppBar sx={{
      bgcolor: 'primary.main',
      p: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <Typography
        sx={{
          color: 'text.primary',
          fontWeight: 'bold',
          fontSize: '2.25em'
        }}
        variant='h1'
      >
        Video Cuestionario
      </Typography>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </AppBar>
  )
}
