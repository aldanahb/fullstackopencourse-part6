import { useSelector, useDispatch } from 'react-redux'
import { voteAnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        const sortAnecdotes = [...state.anecdotes].sort((a, b) => b.votes - a.votes)

        if(state.filter === 'ALL') return sortAnecdotes
        else return sortAnecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteAnAnecdote(id))
        
        // agregar notificación
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id == id).content}'`, 5))
    }

    return(<div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </div>)
}

export default AnecdoteList