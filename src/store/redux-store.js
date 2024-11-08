import {createSlice, configureStore } from '@reduxjs/toolkit'

const initialExpenseState={expenses:[]};

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        add(state,action){
            state.expenses=[...state.expenses,action.payload]
        },
        replace(state,action){
            state.expenses=action.payload
        },
        delete(state,action){
            state.expenses=state.expenses.filter(item => item.id !== action.payload);
        },
        edit(state,action){
            state.expenses=state.expenses.map(item => item.id === action.payload.id ? { ...item, ...action.payload.obj } : item)
        }
    }
})
const localToken=localStorage.getItem('token')
const localId=localStorage.getItem('userId')
const initailTokenState={token:localStorage.getItem('token'),login:false,userId:localId,isLoggedIn:(localToken==='null'?false:true)};
const authSlice=createSlice({
    name:'auth',
    initialState:initailTokenState,
    reducers:{
        changeLogin(state){
            state.login=(!state.login)
        },
        login(state,action){
            
            state.token=action.payload;
            state.isLoggedIn=!!state.token
        },
        logout(state){
            state.token=null;
            state.isLoggedIn=!!state.token
            state.login=(!state.login)
        },
        changeUserId(state,action){
            state.userId=action.payload;
        }
    }
})

const initialThemeState={isDarkTheme:false}

const themeSlice=createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        toggleTheme(state){
            state.isDarkTheme=!state.isDarkTheme
        },
        activateDarkTheme(state){
            state.isDarkTheme=true
        }
    }
})

const store=configureStore({
    reducer:{
        expenses:expenseSlice.reducer,
        auth:authSlice.reducer,
        theme:themeSlice.reducer,
    }
})


export const expenseActions=expenseSlice.actions;
export const authActions=authSlice.actions;
export const themeActions=themeSlice.actions;

export default store;