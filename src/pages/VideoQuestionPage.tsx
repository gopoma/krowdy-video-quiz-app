import { type FC, useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import ReplayIcon from '@mui/icons-material/Replay'

import { useQuizzes } from '../hooks'
import type { Question, QuestionAnswer } from '../interfaces'
import { Layout } from '../layouts'
import { VideoCounter, VideoQuizSubmitButton } from '../components'
import { VIDEO_QUESTION_TIME_LIMIT } from '../constants'

export const VideoQuestionPage: FC = () => {
  const navigate = useNavigate()
  const {
    id: idQuiz,
    questions,
    activeAnswer,
    completed,

    minPosition,
    maxPosition,
    addAnswer
  } = useQuizzes()

  const location = useLocation()
  const { order = '' } = queryString.parse(location.search)

  const initialQuestion = (questions as Question[]).find((question) => question.order === Number.parseInt(order as string)) ?? null
  const [question, setQuestion] = useState<Question | null>(initialQuestion)

  // WebRTC implementation
  const [isRecording, setIsRecording] = useState<boolean | null>(null)
  const gumVideoRef = useRef<HTMLVideoElement>(null)
  const recordedVideoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const [isCounting, setIsCounting] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    setQuestion(() => (questions as Question[]).find((question) => question.order === Number.parseInt(order as string)) ?? null)
  }, [order])

  useEffect(() => {
    if (question === null) return

    setIsRecording(() => {
      if (activeAnswer.some((answer) => answer.question.id === question.id)) {
        return false
      }

      return null
    })
  }, [question])

  const requestCounting = (): void => {
    setIsCounting((currentIsCounting) => {
      if (currentIsCounting) {
        setCounter((counter) => {
          if (counter === VIDEO_QUESTION_TIME_LIMIT) {
            _handleStopRecording()
          }

          return counter + 1
        })
      }

      return currentIsCounting
    })
  }

  useEffect(() => {
    const id = setInterval(() => {
      requestCounting()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

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
    if (isRecording === false) {
      const retry = window.confirm('Estás seguro que quieres volver a grabar tu respuesta?:')

      if (!retry) return
    }

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

    mediaRecorder.current.onstop = async () => {
      const mimeType = getSupportedMimeTypes()[0]
      const superBuffer = new Blob(recordedBlobs, { type: mimeType })

      if (recordedVideoRef.current === null) return

      recordedVideoRef.current.srcObject = null

      const videoAnswerURL = window.URL.createObjectURL(superBuffer)
      const answer: QuestionAnswer = {
        question: question as Question,
        videoAnswerURL
      }
      addAnswer(answer)

      recordedVideoRef.current.src = videoAnswerURL
      recordedVideoRef.current.controls = true
    }
    mediaRecorder.current.ondataavailable = handleDataAvailable
    mediaRecorder.current.start()

    setIsCounting(true)
  }

  function handleDataAvailable (event: BlobEvent): void {
    // eslint-disable-next-line
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data)
    }
  }

  const _handleStopRecording = (): void => {
    _handleToggleIsRecording()

    setIsCounting(false)
    setCounter(0)

    mediaRecorder.current?.stop()
  }
  // WebRTC implementation

  const onNavigateBack = (): void => {
    navigate(`/quizzes/${idQuiz as number}`)
  }

  if (question === null) {
    return <Navigate to={ `/quizzes/${idQuiz as number}` } />
  }

  const _handleGoNext = (): void => {
    navigate(`/quizzes/current/questions?order=${question.order + 1}`)
  }

  const _handleGoBack = (): void => {
    navigate(`/quizzes/current/questions?order=${question.order - 1}`)
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
            src={ activeAnswer.find((answer) => answer.question.id === question.id)?.videoAnswerURL ?? '' }
            controls
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

          { (isCounting) ? <VideoCounter counter={ counter } /> : <></> }
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
          justifyContent: (minPosition === question.order) ? 'flex-end' : (maxPosition === question.order) ? 'flex-start' : 'space-between',
          alignItems: 'center'
        }}
      >
        { (minPosition !== question.order) ? <Button onClick={ _handleGoBack } variant='contained'>Atrás</Button> : <></> }
        { (maxPosition !== question.order) ? <Button onClick={ _handleGoNext } variant='contained'>Siguiente</Button> : <></> }
        { (maxPosition === question.order && completed) ? <VideoQuizSubmitButton style={{ marginLeft: 'auto' }} /> : <></> }
      </Box>
    </Layout>
  )
}

export default VideoQuestionPage
