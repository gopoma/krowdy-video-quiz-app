import { useState, type FC, useCallback, useMemo, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ColorModeContext } from './'
import { type PaletteMode } from '@mui/material'
import { grey } from '@mui/material/colors'

// eslint-disable-next-line
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'dark'
        ? {
            main: '#333'
          }
        : {
            main: grey[400]
          })
    },
    secondary: {
      ...(mode === 'dark'
        ? {
            main: '#666'
          }
        : {
            main: grey[200]
          })
    },
    text: {
      ...(mode === 'dark'
        ? {
            primary: '#FFF'
          }
        : {
            primary: '#000'
          })
    }
  }
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

const initialColorMode: PaletteMode = (() => {
  return (localStorage.getItem('colorMode') ?? 'dark') as PaletteMode
})()

export const ColorModeProvider: FC<Props> = ({ children }) => {
  const [colorMode, setColorMode] = useState<PaletteMode>(initialColorMode)

  useEffect(() => {
    localStorage.setItem('colorMode', colorMode)
  }, [colorMode])

  const toggleColorMode = useCallback((): void => {
    setColorMode((prevColorMode) => (prevColorMode === 'light') ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode])

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
