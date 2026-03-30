import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

const { putNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(putNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
            }, time * 1000)
    }
}

export default notificationSlice.reducer