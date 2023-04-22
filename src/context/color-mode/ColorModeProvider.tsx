import { useState, type FC, useCallback, useMemo, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ColorModeContext } from './'

interface Props {
  children: JSX.Element | JSX.Element[]
}

type ColorMode = 'light' | 'dark'

const initialColorMode: ColorMode = (() => {
  return (localStorage.getItem('colorMode') ?? 'dark') as ColorMode
})()

export const ColorModeProvider: FC<Props> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>(initialColorMode)

  useEffect(() => {
    localStorage.setItem('colorMode', colorMode)
  }, [colorMode])

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
