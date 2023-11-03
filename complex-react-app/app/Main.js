// import React, {useState, useReducer, useEffect} from 'react'

//L76 (5:20) add Suspense for our lazy loading of CreatePost and other components.: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19222666#overview
import React, {useState, useReducer, useEffect, Suspense} from 'react'

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

//L76 (4:05) set up Lazy load for Create Post: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19222666#overview
    //import CreatePost from './components/CreatePost'
    // Call the React built in method .lazy() and pass in a function. Use arrow statement () => {} but don't need brackets if just one line () => 
        // use import() and pass the path to our file.
    const CreatePost = React.lazy(() => import('./components/CreatePost'))
        //NOW, when the app first loads, it will NOT contain the contents of the CreatePost.js component.
        //Because this really just contains a promise.

//L76 (8:55) set up Lazy loading for ViewSinglePost: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19222666#overview
        // import ViewSinglePost from './components/ViewSinglePost'
        const ViewSinglePost = React.lazy(() => import('./components/ViewSinglePost'))


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
    //About 4KB before being minimized.
    // L77 (0:45) Lazy load Search Component: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19222670#overview
    // import Search from './components/Search'  
    const Search = React.lazy(() => import('./components/Search'))



//Import installed react-transition-group for CSS transitions in L58 (2:23): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19002510#overview
import { CSSTransition } from 'react-transition-group'

//Imported Chat.js component in L66 (2:47): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
import Chat from "./components/Chat"
import LoadingDotsIcon from './components/LoadingDotsIcon'

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
        isSearchOpen: false,
        //L66 (4:20): https://www.alchemy.com/webhooks
        isChatOpen: false,
        //L69 (8:50) add unread chat count to show unread chat # in Navbar icon
        unreadChatCount: 0
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
            //L66 (4:45) this case will be used for the Navbar chat icon
            case "toggleChat":
                draft.isChatOpen = !draft.isChatOpen
                return
            case "closeChat": 
                draft.isChatOpen = false
                return
            //L69 (9:20) add case for incrementing chat count: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19125232#overview
            case "incrementUnreadChatCount":
                draft.unreadChatCount++
                return
            case "clearUnreadChatCount":
                draft.unreadChatCount = 0
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



// L75 (2:30) - Set up new useEffect that will only run on the initial render. Proactively send axios request to server to check token
    //Copy the axios request template from our Search.js component
// (COPIED FROM SEARCH.js COMPONENT implemented at) L60 (12:55) - second useEffect that listens for changes to requestCount

    //CHECK if token has expired or not on first render:
useEffect(() => {
    if (state.loggedIn){ //check if have a token
        // Send axios request here in L75
        const ourRequest = Axios.CancelToken.source()

        async function fetchResults(){
            try {
                    //Added L61 (~3:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049978#overview
                //Edited L75 (4:10) Axios request: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19194992#overview
                const response = await Axios.post("/checkToken", { token: state.state.user.token }, {cancelToken: ourRequest.token})
                console.log("Search.js mongoDB results from fetchResults was: ",response.data)
                //Server responds with true or false
                    if (!response.data){ //only if server sent back FALSE. (token no longer valid)
                        //log user out. Show flash message telling user to log in again
                        dispatch({type: 'logout'})
                        //Technically, our server is not using sessions, but phrase as such:
                        dispatch({type: "flashmessage", value: "Your session has expired.  Please log in again."})
                    }

                // setState(draft => {
                //     draft.results = response.data
                //     draft.show = 'results'
                // })

            } catch(e) {
                console.log("There was a problem in Main.js axios useEffect() proactively checking user token (L75)",e)
            }
        }
        //call our async fn
        fetchResults()
        //clean up 
        return () => ourRequest.cancel()
        
    }
}, [state.requestCount])  

    return (

            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch} >

            <BrowserRouter>

                <FlashMessages messages={state.flashMessages} />


                <Header />

{/* L76 (5:40) wrap Lazy Loaded Components with the Suspense tag. Here, just wrap a Suspense around our entire overall Routes component */}
        <Suspense fallback={<LoadingDotsIcon />}>

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

        </Suspense>
    {/* Add Search component L57 (1:35) outside of our Routes: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview */}
            {/* L57 (6:40) add conditional display of Search component with initialState and our reducer cases */}
                {/* <Search /> */}
                {/* {state.isSearchOpen ? <Search /> : ''} */}
            {/* L58 (3:48) replace Search with CSS Transitions: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19002510#overview */}
                <CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit >

    {/* L77 (4:20) Set up Search component for lazy loading: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19222670#overview  */}
                 
                    {/* The CSSTransition will add CSS elements to it's DIRECT NEAREST child element */}
                    {/* <Search /> */}

                    <div className="search-overlay">
                    {/* The CSSTransition will now add CSS elements to the div as it's DIRECT NEAREST child element */}
                        <Suspense fallback="">
                            <Search />
                        </Suspense>
                    </div>

                </CSSTransition>

{/* L66 (3:00) Added Chat component */}
                    <Chat />
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
