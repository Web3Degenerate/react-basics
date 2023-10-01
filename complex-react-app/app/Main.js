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

//Added global 404 not found component in L55 (12:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18797676#overview
import NotFound from './components/NotFound'

//Added Search Overlay in L57: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview
import Search from './components/Search'  

//Import installed react-transition-group for CSS transitions in L58 (2:23): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19002510#overview
import { CSSTransition } from 'react-transition-group'

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
        },
        //L57 (5:05) add state for our Search Component: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview
        isSearchOpen: false
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
            case "openSearch": 
            //L57 (5:50) add openSearch and closeSearch cases: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview
                draft.isSearchOpen = true
                return
            case "closeSearch":
                draft.isSearchOpen = false
                return
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
    {/* Catchall Global 404 Not Found via "*" route added in L55 (12:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18797676#overview */}
                    <Route path="*" element={<NotFound message="Main.js Routes, path='*' top level url that can't be found."/>} />
                </Routes>
    {/* Add Search component L57 (1:35) outside of our Routes: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview */}
            {/* L57 (6:40) add conditional display of Search component with initialState and our reducer cases */}
                {/* <Search /> */}
                {/* {state.isSearchOpen ? <Search /> : ''} */}
            {/* L58 (3:48) replace Search with CSS Transitions: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19002510#overview */}
                <CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit >
                    <Search />
                </CSSTransition>


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
