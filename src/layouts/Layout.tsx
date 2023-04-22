import { type FC } from 'react'
import { Navbar } from '../components'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: 'auto',
        padding: '1.2rem',
        paddingTop: '7.5rem'
      }}>
        { children }
      </main>
    </>
  )
}
