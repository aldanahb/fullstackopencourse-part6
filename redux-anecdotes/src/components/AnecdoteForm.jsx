import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    
    const createAnecdote = event => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnecdote(anecdoteContent))
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