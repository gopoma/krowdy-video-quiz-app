import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { QuestionAnswer, Quiz } from '../../interfaces'

interface QuizzesState {
  activeQuiz: Quiz | null
  activeAnswer: QuestionAnswer[]
}

const initialState: QuizzesState = {
  activeQuiz: JSON.parse(localStorage.getItem('active-quiz') as string) ?? null,
  activeAnswer: []
}

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    onSetActiveQuiz: (state, { payload }: PayloadAction<Quiz>) => {
      if (state.activeQuiz?.id !== payload.id) {
        state.activeAnswer = []
      }

      state.activeQuiz = payload
    },
    onAddAnswer: (state, { payload }: PayloadAction<QuestionAnswer>) => {
      if (state.activeAnswer.some((answer) => answer.question.id === payload.question.id)) {
        state.activeAnswer = state.activeAnswer.filter((answer) => answer.question.id !== payload.question.id)
      }

      state.activeAnswer.push(payload)
    }
  }
})

export default quizzesSlice.reducer

export const {
  onSetActiveQuiz,
  onAddAnswer
} = quizzesSlice.actions
