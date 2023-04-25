import { useMemo, type FC, useRef, useLayoutEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import ReplayIcon from '@mui/icons-material/Replay'

import { useQuizzes } from '../hooks'
import type { Question } from '../interfaces'
import { Layout } from '../layouts'

export const VideoQuestionPage: FC = () => {
  const location = useLocation()
  const { order = '' } = queryString.parse(location.search)
  const { id: idQuiz, questions } = useQuizzes()
  const navigate = useNavigate()

  // WebRTC implementation
  const [isRecording, setIsRecording] = useState<boolean | null>(null)
  const gumVideoRef = useRef<HTMLVideoElement>(null)
  const recordedVideoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  useLayoutEffect(() => {
    async function main (): Promise<void> {
      const hasEchoCancellation = false

      const constraints: MediaStreamConstraints = {
        audio: {
          echoCancellation: { exact: hasEchoCancellation }
        },
        video: {
          width: 1280, height: 720
        }
      }

      await init(constraints)
    }

    async function init (constraints: MediaStreamConstraints): Promise<void> {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints)
        handleSuccess(stream)
      } catch (error) {
        console.log(error)
      }
    }

    function handleSuccess (stream: MediaStream): void {
      if (gumVideoRef.current === null) return

      window.stream = stream
      gumVideoRef.current.srcObject = stream
    }

    // eslint-disable-next-line
    main()
  }, [])

  const _handleToggleIsRecording = (): void => {
    setIsRecording((prevIsRecording) => !(prevIsRecording as boolean))
  }

  function getSupportedMimeTypes (): string[] {
    const possibleTypes = [
      'video/webm;codecs=av1,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac'
    ]

    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType)
    })
  }

  let recordedBlobs: Blob[]

  const _handleStartRecording = (): void => {
    _handleToggleIsRecording()

    recordedBlobs = []
    const mimeType = getSupportedMimeTypes()[0]
    const options: MediaRecorderOptions = { mimeType }

    try {
      mediaRecorder.current = new MediaRecorder(window.stream, options)
    } catch (error) {
      console.error('Exception while creating MediaRecorder:', error)
      return
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options)
    mediaRecorder.current.onstop = async (event) => {
      console.log('Recorder stopped: ', event)
      console.log('Recorded Blobs: ', recordedBlobs)

      const mimeType = getSupportedMimeTypes()[0]
      const superBuffer = new Blob(recordedBlobs, { type: mimeType })

      if (recordedVideoRef.current === null) return

      recordedVideoRef.current.srcObject = null
      recordedVideoRef.current.src = window.URL.createObjectURL(superBuffer)
      recordedVideoRef.current.controls = true
    }
    mediaRecorder.current.ondataavailable = handleDataAvailable
    mediaRecorder.current.start()
    console.log('MediaRecorder started', mediaRecorder)
  }

  function handleDataAvailable (event: BlobEvent): void {
    console.log('handleDataAvailable', event)
    // eslint-disable-next-line
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data)
    }
  }

  const _handleStopRecording = (): void => {
    _handleToggleIsRecording()

    mediaRecorder.current?.stop()
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
              display: (isRecording === null)
                ? ''
                : (!isRecording) ? 'none' : '',
              width: '100%',
              height: '100%'
            }}
          ></video>

          <video
            ref={ recordedVideoRef }
            playsInline
            style={{
              display: (isRecording === null)
                ? 'none'
                : (isRecording) ? 'none' : '',
              width: '100%',
              height: '100%'
            }}
          ></video>

          {
            (isRecording as boolean)
              ? <IconButton
                  onClick={ _handleStopRecording }
                  sx={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    bgcolor: 'secondary.main',
                    ':hover': {
                      backgroundColor: 'darkblue',
                      color: '#FFF'
                    }
                  }}
                >
                  <StopIcon />
                </IconButton>
              : <IconButton
                  onClick={ _handleStartRecording }
                  sx={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    bgcolor: 'secondary.main',
                    ':hover': {
                      backgroundColor: 'red',
                      color: '#FFF'
                    }
                  }}
                >
                  { (isRecording === null)
                    ? <PlayArrowIcon />
                    : <ReplayIcon />
                  }
                </IconButton>
          }
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
