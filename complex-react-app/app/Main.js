import React, {useState} from 'react'
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

function Main(){

// Added loggedIn state from Header.js ("Lifted State Up") in L36 (5:35): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview
    const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))

    return (
        <BrowserRouter>
    
            {/* <Header /> */}
            {/* L36 (6:20) pass new loggedIn state to Header component as prop */}
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

            <Routes>
                
                {/* <Route path="/" element={<HomeGuest />} /> */}
{/* Updated HomeGuest to Home in L36: (3:08): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview  */}
{/* Updated dynamic Home route for loggedIn user same L36 at (8:30) */}
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />

                <Route path="/about-us" element={<About />} />
                <Route path="/terms" element={<Terms />} />

{/* Added create-post route in L37 (3:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview */}
                <Route path="/create-post" element={<CreatePost />} />

            </Routes>

            <Footer />

        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
    module.hot.accept()
}
