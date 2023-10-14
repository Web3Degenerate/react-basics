//Created in L66: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
// FROM: https://github.com/LearnWebCode/react-course

import React, { useEffect, useContext, useRef } from "react"

//L66 (7:20) import State context
import StateContext from "../StateContext"

//L66 (9:20) import dispatch context: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
import DispatchContext from '../DispatchContext'


function Chat() {

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

// L66 (16:40)
// (1) Ref is like a box we can hold a value in, but unlike STATE we are allowed to direclty mutate it.
// (2) Also, react will not re-render things when the Ref changes. 
    const chatField = useRef(null)

//LL66 (13:30) set up useEffect to focus the chat text input
    useEffect(() => {

        if(appState.isChatOpen){ //only if the chat was just opened

            //Then focus the text input
            // chatField.current.value = 
            chatField.current.focus()
        }


    }, [appState.isChatOpen])


  return (
        // <div id="chat-wrapper" className="chat-wrapper chat-wrapper--is-visible shadow border-top border-left border-right">
        <div id="chat-wrapper" className={"chat-wrapper shadow border-top border-left border-right " + (appState.isChatOpen ? "chat-wrapper--is-visible" : "")}>
        

        <div className="chat-title-bar bg-primary">
            Chat
            <span onClick={() => appDispatch({type: "closeChat"})} className="chat-title-bar-close">
            <i className="fas fa-times-circle"></i>
            </span>
        </div>
        <div id="chat" className="chat-log">
            <div className="chat-self">
            <div className="chat-message">
                <div className="chat-message-inner">Hey, how are you?</div>
            </div>
            <img className="chat-avatar avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" />
            </div>

            <div className="chat-other">
            <a href="#">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" />
            </a>
            <div className="chat-message">
                <div className="chat-message-inner">
                <a href="#">
                    <strong>barksalot:</strong>
                </a>
                Hey, I am good, how about you?
                </div>
            </div>
            </div>
        </div>
        <form id="chatForm" className="chat-form border-top">
            <input ref={chatField} type="text" className="chat-field" id="chatField" placeholder="Type a message..." autoComplete="off" />
        </form>
        </div>
  )
}

export default Chat