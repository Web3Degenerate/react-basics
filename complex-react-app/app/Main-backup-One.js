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
                // Desired way without immer directly modifies state: 
                //  state.loggedIn = true
            //L43 - draft.loggedIn = true
                // return {loggedIn: true, flashMessages: state.flashMessages} 
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


// L43 change useReducer to useImmerReducer: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18418654#overview
    // const [state, dispatch] = useReducer(ourReducer, initialState)
    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

// L44 (6:10) useEffect() added: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
    // useEffect(function, list or array of dependency that you want to watch for changes.)
    useEffect(() => {
        if(state.loggedIn){
            // localStorage.setItem("complexappToken", response.data.token)
            // localStorage.setItem("complexappUsername", response.data.username)
            // localStorage.setItem("complexappAvatar", response.data.avatar)
                localStorage.setItem("complexappToken", state.user.token)
                localStorage.setItem("complexappUsername", state.user.username)
                localStorage.setItem("complexappAvatar", state.user.avatar)
        }else{
                localStorage.removeItem("complexappToken")
                localStorage.removeItem("complexappUsername")
                localStorage.removeItem("complexappAvatar") 
        }
    },[state.loggedIn])

        // dispatch({type: "login"})
        // dispatch({type: "logout"})
        // dispatch({type: "flashMessage", value: "Congrats, you created a post."})
// END OF useReducer at L41 (1:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391870#overview

// ******************* OLD WAY OF USING STATE FOR loggedIn and flashMessages *********************************************************************//
    //Updated in L42 Duo useReducer & Context: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview 
                // Added loggedIn state from Header.js ("Lifted State Up") in L36 (5:35): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview
                    // const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))

                // Added Flash Message state in L39 (5:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview
                    // const [flashMessages, setFlashMessages] = useState([])
                    
                    // function addFlashMessage(msg) {
                    //     //Need to work with previous value
                    //     setFlashMessages(prev => prev.concat(msg))
                    // }
// ******************* OLD WAY OF USING STATE (L42) FOR loggedIn and flashMessages *********************************************************************//

    return (
        // L40 (10:58) pass multiple values through useContext: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
        // <ExampleContext.Provider value={addFlashMessage}>
                            //set value to be an object {} with multiple valus
        // <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>

// Updated in L42 (1:30): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview
        // <ExampleContext.Provider value={{ state, dispatch }}>
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch} >

            <BrowserRouter>

    {/* Added FlashMessages component in L39: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview   */}
                <FlashMessages messages={state.flashMessages} />

            {/* <Header /> */}
            {/* L36 (6:20) pass new loggedIn state to Header component as prop */}
                {/* <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
            {/* L40 (12:06) remove setLoggedIn from Header and pass in through ExampleContext above */}
{/* L42 (7:10) Duo useReducer and Context don't need to manually pass in loggedIn={loggedIn} */}
                {/* <Header loggedIn={loggedIn} /> */}
                <Header />

                <Routes>
                
                {/* <Route path="/" element={<HomeGuest />} /> */}
{/* Updated HomeGuest to Home in L36: (3:08): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview  */}
{/* Updated dynamic Home route for loggedIn user same L36 at (8:30) */}
                {/* <Route path="/" element={<Home />} /> */}

                    {/* <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} /> */}
{/* Updated L42 (13:30) now pull from state.loggedIn: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview */}
                    <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />

                    <Route path="/about-us" element={<About />} />
                    <Route path="/terms" element={<Terms />} />

{/* Added create-post route in L37 (3:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview */}
                {/* Updated FlashMessages L39 (11:09): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview */}
                    {/* <Route path="/create-post" element={<CreatePost  addFlashMessage={addFlashMessage} />} /> */}
                {/* Updated FlashMessages to ExampleContext.Provider L40 (6:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview */}
                    <Route path="/create-post" element={<CreatePost />} />

{/* Added view-single-post route in L38 (3:30): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18282394#overview */}
                    <Route path="/post/:id" element={<ViewSinglePost />} />

                </Routes>

                <Footer />

            </BrowserRouter>

                </DispatchContext.Provider>
            </StateContext.Provider>
        // {/* </ExampleContext.Provider> */}
    )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
    module.hot.accept()
}
