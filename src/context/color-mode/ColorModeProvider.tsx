import { useState, type FC, useCallback, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ColorModeContext } from './'

interface Props {
  children: JSX.Element | JSX.Element[]
}

type ColorMode = 'light' | 'dark'

export const ColorModeProvider: FC<Props> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('light')

  const toggleColorMode = useCallback((): void => {
    setColorMode((prevColorMode) => (prevColorMode === 'light') ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => createTheme({ palette: { mode: colorMode } }), [colorMode])

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
