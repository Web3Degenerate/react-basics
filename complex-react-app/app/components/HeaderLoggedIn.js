import React, { useEffect, useContext } from "react"

//Added Link in L37
import {Link} from 'react-router-dom'

//Added DispatchContext in L40 (14:00)
import DispatchContext from '../DispatchContext'
//Added StateContext in L44 (10:25): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
import StateContext from '../StateContext'

//Added react-tooltip in L58 (8:45)
import {Tooltip as ReactTooltip } from 'react-tooltip' //alias the name it used to be called.

//Added in: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview

function HeaderLoggedIn(props) {

    //de-structure property setLoggedIn from object {} ExampleContext in L40 (14:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
    const appDispatch = useContext(DispatchContext)
//L44 (10:40) added appContext: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
    const appState = useContext(StateContext)

    function handleLogout() {
            //Added at (6:50): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview
            // props.setLoggedIn(false)
                //    {props.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
    // L42 (10:26) change setLoggedIn(false) to appDispatch({type: "logout"}): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview
            // setLoggedIn(false) //pull from useContext in L40
            appDispatch({ type: "logout" })

            //Remove token, username and avatar from localStorage
            /* Removed in L44(9:30) - useEffect in Main.js: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
                localStorage.removeItem("complexappToken")
                localStorage.removeItem("complexappUsername")
                localStorage.removeItem("complexappAvatar")
            */
    }

    // L57 (8:01) onClick handler for search icon/Search overlay
    // const handleSearchIcon = () => {
    function handleSearchIcon(e) {
        e.preventDefault()
        //L57 (8:25) - use our app-wide dispatch to send off an action of open search
            // give appDispatch the object type: "openSearch" case
        appDispatch({type: "openSearch"})
    }

  return (
        <div className="flex-row my-3 my-md-0">

        {/* L57 (7:35) search icon trigger search Overlay: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview */}
            <a onClick={handleSearchIcon} href="#" className="text-white mr-2 header-search-icon"
                data-tooltip-id="search" data-tooltip-content="Search"
            >
                <i className="fas fa-search"></i>
            </a>
    {/* L58 (8:50) add React Tooltip */}
            <ReactTooltip place="bottom" id="search" className="custom-tooltip" />

    {/* L66 (8:35) || onClick={() => alert("anonymous functions are cool")} */}
        {' '}<span onClick={() => appDispatch({type: "toggleChat"}) }  data-tooltip-id="chat" data-tooltip-content="Chat" className={`mr-2 header-chat-icon ` + (appState.unreadChatCount ? "text-danger" : "text-white")}>
                <i className="fas fa-comment"></i>
                {appState.unreadChatCount ? <span className="chat-count-badge text-white">{appState.unreadChatCount < 10 ? appState.unreadChatCount : '9+'} </span> : ""}
            </span>

            <ReactTooltip place="bottom" id="chat" className="custom-tooltip" />


{/* Dynamic link added in L45 (~4th - 5th minute): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview  */}
    {' '} <Link to={`/profile/${appState.user.username}`} className="mr-2"
            data-tooltip-id="profile" data-tooltip-content="Profile"
            >
{/* Dynamic img Avatar Link URL added L35: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview */}
            {/* <img className="small-header-avatar" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> */}
            {/* This pulls the image from the registered email. If none found, defaults to default gravatar.com logo */}
{/* L44 (10:55) replace localStorage.getItem(): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview */}
            {/* <img className="small-header-avatar" src={localStorage.getItem("complexappAvatar")} /> */}

                <img className="small-header-avatar" src={appState.user.avatar} />
            </Link>

            <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />



    {' '}  <Link className="btn btn-sm btn-success mr-2" to="/create-post">
                Create Post
            </Link>

{/* Arrow function set props.setLoggedIn() to false */}
            {/* <button onClick={() => props.setLoggedIn(false)} className="btn btn-sm btn-secondary"> */}
{/* Changed to Named Function: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview */}
            
    {' '}   <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                Sign Out
            </button>
    </div>
  )
}

export default HeaderLoggedIn