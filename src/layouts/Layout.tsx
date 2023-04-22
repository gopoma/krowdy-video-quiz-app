import { type FC } from 'react'
import { Navbar } from '../components'
import { Box } from '@mui/material'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <nav>
        <Navbar />
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: 'auto',
        padding: '1.2rem',
        paddingTop: '7rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        { children }
      </main>
    </Box>
  )
}
