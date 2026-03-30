import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], 
  reducers: {
    voteAnecdote(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, addAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => { 
  return async (dispatch) => {
    const anecdoteCreated = await anecdoteService.createNewAnecdote(content)
    dispatch(addAnecdote(anecdoteCreated))
  }
}

export const voteAnAnecdote = (id)  => { 
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(id)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
