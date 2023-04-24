import { useMemo, type FC, useRef, useLayoutEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { useQuizzes } from '../hooks'
import type { Question } from '../interfaces'
import { Layout } from '../layouts'

export const VideoQuestionPage: FC = () => {
  const location = useLocation()
  const { order = '' } = queryString.parse(location.search)
  const { id: idQuiz, questions } = useQuizzes()
  const navigate = useNavigate()

  // WebRTC implementation
  const gumVideoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    interface Constraints {
      audio: AudioConstraints
      video: VideoConstraints
    }

    interface AudioConstraints {
      echoCancellation: { exact: boolean }
    }

    interface VideoConstraints {
      width: number
      height: number
    }

    async function main (): Promise<void> {
      const hasEchoCancellation = false

      const constraints: Constraints = {
        audio: {
          echoCancellation: { exact: hasEchoCancellation }
        },
        video: {
          width: 1280, height: 720
        }
      }

      await init(constraints)
    }

    // eslint-disable-next-line
    async function init (constraints: Constraints): Promise<void> {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints)
        handleSuccess(stream)
      } catch (error) {
        console.log(error)
      }
    }

    function handleSuccess (stream: MediaStream): void {
      if (gumVideoRef.current === null) return

      gumVideoRef.current.srcObject = stream
    }

    // eslint-disable-next-line
    main()
  }, [])

  const _handleStartRecording = (): void => {
    console.log('recording...')
  }
  // WebRTC implementation

  const onNavigateBack = (): void => {
    navigate(`/quizzes/${idQuiz as number}`)
  }

  const question = useMemo(() => (questions as Question[]).find((question) => question.order === Number.parseInt(order as string)) ?? null, [])

  if (question === null) {
    return <Navigate to={ `/quizzes/${idQuiz as number}` } />
  }

  return (
    <Layout style={{ maxWidth: '800px' }}>
      <Box component='section'>
        <Button
          variant='contained'
          onClick={ onNavigateBack }
          sx={{
            display: 'flex',
            gap: '0.45rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ArrowBackIcon />
          <Typography
            sx={{
              fontSize: '0.85em',
              fontWeight: 'bold'
            }}
          >
            Volver
          </Typography>
        </Button>
      </Box>

      <Box
        component='section'
        sx={{ height: '65vh' }}
      >
        <Box
          component='section'
          sx={{
            position: 'relative',
            height: '85%',
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#000'
          }}
        >
          <video
            ref={ gumVideoRef }
            playsInline
            autoPlay
            muted
            style={{
              width: '100%',
              height: '100%'
            }}
          ></video>

          <IconButton
            onClick={ _handleStartRecording }
            sx={{
              position: 'absolute',
              bottom: '0.85rem',
              left: '0.85rem',
              bgcolor: 'secondary.main',
              ':hover': {
                backgroundColor: 'red',
                color: '#FFF'
              }
            }}
          >
            <PlayArrowIcon />
          </IconButton>
        </Box>

        <Box
          component='section'
          sx={{
            height: '8%',
            borderRadius: '0 0 8px 8px',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'primary.main'
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontSize: '1.25em',
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            { question.statement }
          </Typography>
        </Box>
      </Box>

      <Box
        component='section'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button
          variant='contained'
        >
          Atrás
        </Button>
        <Button
          variant='contained'
        >
          Siguiente
        </Button>
      </Box>
    </Layout>
  )
}

export default VideoQuestionPage
