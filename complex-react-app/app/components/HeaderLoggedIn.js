import React, { useEffect, useContext } from "react"

//Added Link in L37
import {Link} from 'react-router-dom'

//Added context in L40 (14:00)
import DispatchContext from '../DispatchContext'

//Added in: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview

function HeaderLoggedIn(props) {

    //de-structure property setLoggedIn from object {} ExampleContext in L40 (14:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
    const appDispatch = useContext(DispatchContext)


    function handleLogout() {
            //Added at (6:50): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview
            // props.setLoggedIn(false)
                //    {props.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
    // L42 (10:26) change setLoggedIn(false) to appDispatch({type: "logout"}): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview
            // setLoggedIn(false) //pull from useContext in L40
            appDispatch({ type: "logout" })

            //Remove token, username and avatar from localStorage
            localStorage.removeItem("complexappToken")
            localStorage.removeItem("complexappUsername")
            localStorage.removeItem("complexappAvatar")
    }


  return (
        <div className="flex-row my-3 my-md-0">
            <a href="#" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
            </a>
            <span className="mr-2 header-chat-icon text-white">
                <i className="fas fa-comment"></i>
                <span className="chat-count-badge text-white"> </span>
            </span>

            <a href="#" className="mr-2">
{/* Dynamic img Avatar Link URL added L35: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview */}
            {/* <img className="small-header-avatar" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> */}
            {/* This pulls the image from the registered email. If none found, defaults to default gravatar.com logo */}
            <img className="small-header-avatar" src={localStorage.getItem("complexappAvatar")} />

            </a>

            <Link className="btn btn-sm btn-success mr-2" to="/create-post">
            Create Post
            </Link>

{/* Arrow function set props.setLoggedIn() to false */}
            {/* <button onClick={() => props.setLoggedIn(false)} className="btn btn-sm btn-secondary"> */}
{/* Changed to Named Function: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview */}
            <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                Sign Out
            </button>
    </div>
  )
}

export default HeaderLoggedIn