//Created in L66: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
// FROM: https://github.com/LearnWebCode/react-course

import React, { useEffect, useContext, useRef } from "react"

//L66 (7:20) import State context
import StateContext from "../StateContext"

//L66 (9:20) import dispatch context: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
import DispatchContext from '../DispatchContext'

//L67 (0:50) import immer to use for setting the state of the chat input text field: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19102908#overview
import { useImmer } from "use-immer"

// L68 (2:50) import socket.io-client: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19102912#overview
import io from 'socket.io-client'
const socket = io("http://localhost:8080") //pass it url that points to our server. Establishes connection b/t browser & backend server

// L69 (1:15) add Link to click on user in chat box and see their profile
import { Link } from 'react-router-dom'


function Chat() {

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

// L66 (16:40)
// (1) Ref is like a box we can hold a value in, but unlike STATE we are allowed to direclty mutate it.
// (2) Also, react will not re-render things when the Ref changes. 
    const chatField = useRef(null)

// L69 (5:20) set up chatLog useRef: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19125232#overview
    const chatLog = useRef(null)

// L67 (1:09) set up immer state: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19102908#overview   
    const [state, setState] = useImmer({
        fieldValue: '',
        // L67 (6:10) add another state to store all our chats, which we will then loop through. Re-renders when new one added
        chatMessages: []
    })

//LL66 (13:30) set up useEffect to focus the chat text input
    useEffect(() => {
        if(appState.isChatOpen){ //only if the chat was just opened
            //Then focus the text input
            // chatField.current.value = 
            chatField.current.focus()
//L69 (~12:30) - set up Main.js' ourReducer function clearUnreadChatMessages: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19125232#overview
            appDispatch({type: "clearUnreadChatCount"})
        }
    }, [appState.isChatOpen])

//L68 (5:40) set up 2nd useEffect to listen for 'chatFromServer' event the first time chat component renders: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19102912#overview
    useEffect(() => {
        socket.on("chatFromServer", message => { //brad programmed server to emit 'chatFromServer'
            setState(draft => {
                draft.chatMessages.push(message)
            })
        }) 
    }, [])    


//L69 (6:20): Set up 3rd useEffect to watch array of messages (chatLog useRef) and focus on the last one: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19125232#overview
    useEffect(() => {
        //scrollTop property of browser, set to current height
        chatLog.current.scrollTop = chatLog.current.scrollHeight
//L69 (~11:30) Set up ourReducer case incrementUnreadChatCount in Main.js and run it here, when chat length 1+ and chat is open: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19125232#overview
        if(state.chatMessages.length && !appState.isChatOpen){
            appDispatch({type: "incrementUnreadChatCount"})
        }
    }, [state.chatMessages])    

//L67 setup handleFieldChange (~2:10)
    function handleFieldChange(e){
        const value = e.target.value;
        setState(draft => {
            // (L67 2:40) The 'e.target.value' synthetic event is not available once you're in another function deep here
            //SO DEFINE IT BEFORE setState!
            draft.fieldValue = value;
        })
    }

// L67 (3:50) set up submitHandler function on chat form
    function handleSubmit(e) {
        e.preventDefault()
        // alert(`User has typed in: ${state.fieldValue}`)
             
        // L68 (1:20) (1) Send message to chat server:
            // TWO WAY Communication: Open up a socket connection b/t browser and a server. 
            // instead of axios, use socket.io
        //L68 (4:10) name of event type 'chatFromBrowser'
        socket.emit("chatFromBrowser", {message: state.fieldValue, token: appState.user.token}) //brad configured it to look for 'chatFromBrowser'
                //server will broadcast message out to any other connected users. 

        setState((draft) => {
            // L67 (6:30) (2) Add message to state collection array of messages
                draft.chatMessages.push({message: draft.fieldValue, username: appState.user.username, avatar: appState.user.avatar})

            // L67 - clear out chat text input after submit
                draft.fieldValue = ''
        })
    }


  return (
        // <div id="chat-wrapper" className="chat-wrapper chat-wrapper--is-visible shadow border-top border-left border-right">
        <div id="chat-wrapper" className={"chat-wrapper shadow border-top border-left border-right " + (appState.isChatOpen ? "chat-wrapper--is-visible" : "")}>
        

        <div className="chat-title-bar bg-primary">
            Chat
            <span onClick={() => appDispatch({type: "closeChat"})} className="chat-title-bar-close">
            <i className="fas fa-times-circle"></i>
            </span>
        </div>

{/* L69 (5:10) add useRef on chat-log div to focus on most recent chat: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19125232#overview */}
    <div id="chat" className="chat-log" ref={chatLog} >

        {/* L67 (8:35) loop through chat messages */}
                {/* check which template to use */}
            {state.chatMessages.map((message, index) => {
                if (message.username == appState.user.username) {
                    return (
                        <div key={index} className="chat-self">
                            <div className="chat-message">
                                <div className="chat-message-inner">{message.message}</div>
                            </div>
                            <img className="chat-avatar avatar-tiny" src={message.avatar} />
                        </div>
                    )
                } 
               
                return (
                    <div key={index} className="chat-other">
                            <Link to={`/profile/${message.username}`}>
                                <img className="avatar-tiny" src={message.avatar} />
                            </Link>

                            <div className="chat-message">
                                <div className="chat-message-inner">
                                <Link to={`/profile/${message.username}`}>
                                    <strong>{message.username}: </strong>
                                </Link>
                                {message.message}                              
                                </div>
                            </div>
                    </div>
                )
               
            })}

                    

                    
    </div>

        {/* L67 (3:30) set up onSubmit handler */}
        <form onSubmit={handleSubmit} id="chatForm" className="chat-form border-top">
            {/* ref set up in L66. onChange set up in L67 */}
            {/* L67 (4:50) set value to state.fieldValue and is now a controlled input */}
            <input value={state.fieldValue} onChange={handleFieldChange} ref={chatField} type="text" className="chat-field" id="chatField" placeholder="Type a message..." autoComplete="off" />
        </form>
        </div>
  )
}

export default Chat