import { type FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { AppBar, Typography, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../context'

export const Navbar: FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <AppBar sx={{
      bgcolor: 'primary.main',
      px: 4,
      py: 3,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <Link to='/'>
        <Typography
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: '2.25em'
          }}
          variant='h1'
        >
          VideoQuizizz
        </Typography>
      </Link>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </AppBar>
  )
}
