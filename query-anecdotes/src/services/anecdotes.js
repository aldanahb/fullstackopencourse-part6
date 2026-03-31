const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const createAnecdote = async (content) => {

    const anecdote = {
        // id: 100000 * Math.random().toFixed(0),
        content: content,
        votes: 0
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

const updateAnecdote = async (id) => {

    const anecdoteResponse = await fetch(`${baseUrl}/${id}`)

    if(!anecdoteResponse.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    const anecdote = await anecdoteResponse.json()

    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote)
    }

    const updateResponse = await fetch(`${baseUrl}/${id}`, options)

    return await updateResponse.json()
}

export { getAll, createAnecdote, updateAnecdote }