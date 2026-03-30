import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRef } from 'react' 
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const timeoutRef = useRef(null)
    
    const createAnecdote = async event => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.createNewAnecdote(anecdoteContent)

        dispatch(addAnecdote(newAnecdote))

        // agregar notificación
        dispatch(setNotification(`you added '${anecdoteContent}'`))
        
        // verificar si ya hay alguna notificación y reiniciar contador
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        
        // quitar notificación a los 5 segundos
        timeoutRef.current = setTimeout(() => {
            dispatch(setNotification(''))
            }, 5000) 
    }

    return (<div>
        <h2>create new</h2>
            <form onSubmit= {createAnecdote}>
                <div>
                    <input name="anecdote" /> 
                </div>
                <button type="submit">create</button>
            </form>
        </div>)
}

export default AnecdoteForm