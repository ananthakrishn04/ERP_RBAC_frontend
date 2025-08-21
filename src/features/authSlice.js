/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : {
            username : null,
            role : null
        },
        token : {
            access : null,
            refresh : null
        }
    },
    reducers : {
        setCredentials : (state, action) => {
            const { username, role, access, refresh } = action.payload
            state.user = { username, role}
            state.token = { access, refresh }
        },
        clearCredentials : (state, action) => {
            state.user = {
                username : null,
                role : null
            },
            state.token = {
                access : null,
                refresh : null
            }
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions

export const getUser = (state) => state.auth.user
export const getCurrentToken = (state) => state.auth.token 

export default authSlice.reducer