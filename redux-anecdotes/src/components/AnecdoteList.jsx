import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        const sortAnecdotes = [...state.anecdotes].sort((a, b) => b.votes - a.votes)

        if(state.filter === 'ALL') return sortAnecdotes
        else return sortAnecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteAnecdote(id))
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