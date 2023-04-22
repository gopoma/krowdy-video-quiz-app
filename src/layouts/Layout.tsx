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

      <main style={{ marginTop: '7rem' }}>
        { children }
      </main>
    </>
  )
}
