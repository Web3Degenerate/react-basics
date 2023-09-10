import React, {useState, useReducer } from 'react'
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

import ExampleContext from './ExampleContext'

function Main(){

// Added useReducer at L41 (1:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391870#overview
    const initialState = {
        loggedIn: Boolean(localStorage.getItem("complexappToken")), 
        flashMessages: [] 
    }

    function ourReducer(state, action){
        switch (action.type){
            //outline cases dependeing on value of action.type
            case "login": 
                return {loggedIn: true, flashMessages: state.flashMessages} 
            case "logout":
                return {loggedIn: false, flashMessages: state.flashMessages}
            case "flashMessage":
                return {loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value)}
        }
    }

    const [state, dispatch] = useReducer(ourReducer, initialState)
        // dispatch({type: "login"})
        // dispatch({type: "logout"})
        // dispatch({type: "flashMessage", value: "Congrats, you created a post."})
// END OF useReducer at L41 (1:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391870#overview


// Added loggedIn state from Header.js ("Lifted State Up") in L36 (5:35): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview
    const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))

// Added Flash Message state in L39 (5:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview
    const [flashMessages, setFlashMessages] = useState([])

    function addFlashMessage(msg) {
        //Need to work with previous value
        setFlashMessages(prev => prev.concat(msg))
    }

    return (
        // L40 (10:58) pass multiple values through useContext: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
        // <ExampleContext.Provider value={addFlashMessage}>
                            //set value to be an object {} with multiple values
        <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>

            <BrowserRouter>

    {/* Added FlashMessages component in L39: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview   */}
                <FlashMessages messages={flashMessages} />

            {/* <Header /> */}
            {/* L36 (6:20) pass new loggedIn state to Header component as prop */}
                {/* <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
            {/* L40 (12:06) remove setLoggedIn from Header and pass in through ExampleContext above */}
                <Header loggedIn={loggedIn} />

                <Routes>
                
                {/* <Route path="/" element={<HomeGuest />} /> */}
{/* Updated HomeGuest to Home in L36: (3:08): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview  */}
{/* Updated dynamic Home route for loggedIn user same L36 at (8:30) */}
                {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />

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
        </ExampleContext.Provider>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
    module.hot.accept()
}
