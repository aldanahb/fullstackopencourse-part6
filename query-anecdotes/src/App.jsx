import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './services/anecdotes'
import { useContext } from 'react'
import NotificationContext from './NotificationContext.jsx'

const App = () => {
  
  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)

  const updateAnecdoteteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id == updatedAnecdote.id ? updatedAnecdote : a))
    }
  })

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1 // solo se realiza un reintento si no anda el servidor
  })

  if(anecdotesQuery.isLoading) {
     return <div>loading data...</div>
  }

  if(anecdotesQuery.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = anecdotesQuery.data

  const handleVote = (anecdote) => {
    updateAnecdoteteMutation.mutate(anecdote.id)
    notificationDispatch({
      type: 'SET',
      payload: `anecdote '${anecdote.content}' voted`
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
