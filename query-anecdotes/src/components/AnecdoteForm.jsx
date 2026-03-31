import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext.jsx'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      // notificación de éxito
      notificationDispatch({
        type: 'SET',
        payload: `anecdote '${newAnecdote.content}' created`
      })

      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      // notificación de fracaso
      notificationDispatch({
        type: 'SET',
        payload: 'too short anecdote, must have length 5 or more'
      })

      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
