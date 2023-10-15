//Created in L66: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
// FROM: https://github.com/LearnWebCode/react-course

import React, { useEffect, useContext, useRef } from "react"

//L66 (7:20) import State context
import StateContext from "../StateContext"

//L66 (9:20) import dispatch context: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19096866#overview
import DispatchContext from '../DispatchContext'

//L67 (0:50) import immer to use for setting the state of the chat input text field: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19102908#overview
import { useImmer } from "use-immer"

function Chat() {

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

// L66 (16:40)
// (1) Ref is like a box we can hold a value in, but unlike STATE we are allowed to direclty mutate it.
// (2) Also, react will not re-render things when the Ref changes. 
    const chatField = useRef(null)

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
        }


    }, [appState.isChatOpen])


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

        
        
        //clear chat text input after submit
        setState(draft => {
            // L67 (6:30) Send message to chat server and (2) Add message to state collection array of messages
            draft.chatMessages.push({message: draft.fieldValue, username: appState.user.username, avatar: appState.user.avatar})
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
        <div id="chat" className="chat-log">

        {/* L67 (8:35) loop through chat messages */}
            {state.chatMessages.map((message, index) => {
                //check which template to use
                if (message.username == appState.user.username) {
                    return (
                        <div className="chat-self">
                            <div className="chat-message">
                                <div className="chat-message-inner">{message.message}</div>
                            </div>
                            <img className="chat-avatar avatar-tiny" src={message.avatar} />
                        </div>
                    )
                } 
                {/* else { */}
                return (
                    <div className="chat-other">
                            <a href="#">
                                <img className="avatar-tiny" src={message.avatar} />
                            </a>
                            <div className="chat-message">
                                <div className="chat-message-inner">
                                <a href="#">
                                    <strong>barksalot:</strong>
                                </a>
                                {message.message}
                                </div>
                            </div>
                    </div>
                )
                {/* } */}
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