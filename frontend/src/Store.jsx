import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './redux/UserSlice'
import ChangeSlice from './redux/ChangeSlice'

export const store=configureStore({
       reducer:{
            user:UserSlice.reducer,
            change:ChangeSlice.reducer
       }
})