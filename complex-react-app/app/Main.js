import React, {useState, useReducer, useEffect} from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

//L37 at (9:45) set up baseURL and import axios: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"

import About from "./components/About"
import Terms from "./components/Terms"

import Home from './components/Home'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'

import FlashMessages from './components/FlashMessages'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

//Added in L43: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18418654#overview
import { useImmerReducer } from 'use-immer'

import Profile from "./components/Profile"
//Added in L52: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18594986#overview
import EditPost from './components/EditPost'  

function Main(){

// Added useReducer at L41 (1:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391870#overview
    const initialState = {
        loggedIn: Boolean(localStorage.getItem("complexappToken")), 
        flashMessages: [],
        //L44 useEffect: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
        //user object will now be available in our global or app-wide state:
        user: {
            token: localStorage.getItem("complexappToken"),
            username: localStorage.getItem("complexappUsername"),
            avatar: localStorage.getItem("complexappAvatar")
        } 
    }

// Call state draft b/c Immer in L43: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18418654#overview      
    // function ourReducer(state, action){
    function ourReducer(draft, action){
        switch (action.type){
            //outline cases dependeing on value of action.type
            case "login": 
                draft.loggedIn = true
            //L44 - added draft.user = x (4:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
                draft.user = action.data
                return //break
            case "logout":
            //L43 - draft.loggedIn = false
                // return {loggedIn: false, flashMessages: state.flashMessages}
                draft.loggedIn = false
                return //break
            case "flashMessage":
            //L43 - draft.flashMessages.push(action.value)
                // return {loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value)}
                draft.flashMessages.push(action.value)
                return //break
        }
    }


    const [state, dispatch] = useImmerReducer(ourReducer, initialState)


    useEffect(() => {
        if(state.loggedIn){
                localStorage.setItem("complexappToken", state.user.token)
                localStorage.setItem("complexappUsername", state.user.username)
                localStorage.setItem("complexappAvatar", state.user.avatar)
        }else{
                localStorage.removeItem("complexappToken")
                localStorage.removeItem("complexappUsername")
                localStorage.removeItem("complexappAvatar") 
        }
    },[state.loggedIn])


    return (

            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch} >

            <BrowserRouter>

                <FlashMessages messages={state.flashMessages} />


                <Header />

                <Routes>

                    <Route path="/profile/:username/*" element={<Profile />} />
                    <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/post/:id" element={<ViewSinglePost />} />
                    <Route path="/post/:id/edit" element={<EditPost />} />

                </Routes>

                <Footer />

            </BrowserRouter>

                </DispatchContext.Provider>
            </StateContext.Provider>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
    module.hot.accept()
}
