import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    
    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(anecdoteContent))

        // agregar notificación
        dispatch(setNotification(`you added '${anecdoteContent}'`, 5))
    }

    return (<div>
        <h2>create new</h2>
            <form onSubmit= {newAnecdote}>
                <div>
                    <input name="anecdote" /> 
                </div>
                <button type="submit">create</button>
            </form>
        </div>)
}

export default AnecdoteForm