import { type FC, type CSSProperties } from 'react'
import { Box } from '@mui/material'
import { Navbar } from '../components'

interface Props {
  style?: CSSProperties
  children: JSX.Element | JSX.Element[]
}

export const Layout: FC<Props> = ({ style, children }) => {
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
        gap: '1.25rem',
        ...style
      }}>
        { children }
      </main>
    </Box>
  )
}
