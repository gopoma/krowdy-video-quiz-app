import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Quiz } from '../../interfaces'

interface QuestionAnswer {
  idQuestion: number
  answer: string
}

interface QuizzesState {
  activeQuiz: Quiz | null
  activeAnswer: QuestionAnswer[]
}

const initialState: QuizzesState = {
  activeQuiz: null,
  activeAnswer: []
}

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    onSetActiveQuiz: (state, { payload }: PayloadAction<Quiz>) => {
      state.activeQuiz = payload

      if (state.activeQuiz?.id !== payload.id) {
        state.activeAnswer = []
      }
    }
  }
})

export default quizzesSlice.reducer

export const {
  onSetActiveQuiz
} = quizzesSlice.actions
