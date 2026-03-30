import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRef } from 'react' 

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        const sortAnecdotes = [...state.anecdotes].sort((a, b) => b.votes - a.votes)

        if(state.filter === 'ALL') return sortAnecdotes
        else return sortAnecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const timeoutRef = useRef(null)

    const vote = id => {
        dispatch(voteAnecdote(id))
        
        // agregar notificación
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id == id).content}'`))

        // verificar si ya hay alguna notificación y reiniciar contador
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        // quitar notificación a los 5 segundos
        timeoutRef.current = setTimeout(() => {
            dispatch(setNotification(''))
            }, 5000)
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