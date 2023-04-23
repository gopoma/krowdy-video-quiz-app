import { type FC } from 'react'
import { Button } from '@mui/material'
import { red, grey } from '@mui/material/colors'

interface Props {
  disabled: boolean
}

export const VideoQuizSubmitButton: FC<Props> = ({ disabled }) => {
  return (
    <Button
      disabled={ disabled }
      sx={{
        px: '0.75rem',
        py: '0.45rem',
        backgroundColor: red[700],
        color: grey[100],
        ':hover': {
          backgroundColor: red[900]
        },
        ':disabled': {
          backgroundColor: red[400]
        },
        fontSize: '1.08em'
      }}
    >
      Enviar
    </Button>
  )
}
