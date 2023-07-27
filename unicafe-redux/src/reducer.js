import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const noteSlice = createSlice({
    name: 'evaluation',
    initialState,
    reducers: {
        good(state, action) {
            return {...state, good: state.good + 1}
        },
        bad(state, action) {
            return {...state, bad: state.bad + 1}
        },
        ok(state, action) {
            return {...state, ok: state.ok + 1}
        },
        zero(state, action) {
            return initialState
        },
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: 1,
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        }
    },
})


export default noteSlice
