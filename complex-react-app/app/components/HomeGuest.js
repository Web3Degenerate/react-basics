import React, {useState, useRef} from 'react'

// import Container from './Container'  // move to page L23 (~10:18)
import Page from './Page'

import Axios from 'axios'

//L70 (2:40) - Add useImmerReducer
import { useImmerReducer } from 'use-immer'

//L70 (14:40) - import CSS Transitio0n Group from react-transition-group: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview
import { CSSTransition } from 'react-transition-group'

function HomeGuest() {

//From update note: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19689368#overview
    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     try {
    //     await Axios.post("http://localhost:8080/register", { username, email, password })
    //     console.log("User was successfully created.")
    //     } catch (e) {
    //     console.log(e.response.data)
    //     }
    // }


//L70 (1:40) replaced useState with client-side validation: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview
    // const [username, setUsername] = useState()
    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()

//L70 - useImmer reducer for our register new user state management: 
    const initialState = {
        username: {
           value: "",
           hasErrors: false, 
           message: "",
           isUnique: false, //check username unique
            checkCount: 0
        },
        email: {
            value: "",
            hasErrors: false, 
            message: "",
            isUnique: false, //check email unique
            checkCount: 0
         }, 
         password: {
            value: "",
            hasErrors: false, 
            message: ""
         },
         submitCount: 0
    } 

//L70 (5:10) add in our reducer: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview
    function ourReducer(draft, action){
        switch (action.type) {
            case "usernameImmediately": 
            //store value in state (L70 11:50)
                draft.username.hasErrors = false
                draft.username.value = action.value
                if (draft.username.value.length > 30) {
                    draft.username.hasErrors = true
                    draft.username.message = "Username cannot exceed 30 characters."
                }
                if (draft.username.value && !/^([a-zA-Z0-9]+)%/.test(draft.username.value)){
                    draft.username.hasErrors = true
                }

                return
            case "usernameAfterDelay":
                //delayed verification, like username requried length, wait 800ms after user stopped typing
                return
            case "usernameUniqueResults": 
                return
            case "emailImmediately": 
                draft.email.hasErrors = false
                draft.email.value = action.value
                return
            case "emailAfterDelay": 
                return 
            case "emailUniqueResults": 
                return
            case "passwordImmediately": 
                draft.password.hasErrors = false
                draft.password.value = action.value
                return
            case "passwordAfterDelay": 
                return 
            case "submitForm": 
                return
        }
    }

// L70 (9:50) set up our dispatch: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview
    // const [state, dispatch] = useImmerReducer(reducer, initialState)
    const [state, dispatch] = useImmerReducer()


    // async function handleSubmit(e){
    function handleSubmit(e){
        e.preventDefault()

        //L 70 (1:50) replaced old try and catch block: 
            // try {
                        // Axios.post(URL SEND Request, ANY DATA SEND TO SERVER)
                        // await Axios.post("http://localhost:8080/register", {username: "Howard", email: "Howard@test.com", password: "qwerty123456" })
                        // await Axios.post("http://localhost:8080/register", {username: username, email: email, password: password })

                        //L37 (~10th min) set baseURL in Main.js
                        // await Axios.post("http://localhost:8080/register", {username, email, password })
            //     await Axios.post("/register", {username, email, password })

            //     console.log("User was successfully created in handleSubmit")
            // } catch (error) {
            //     console.log("Error from handleSubmit is ",error.response.data)
            // }
    }


    return(
        <Page title="Home" wide={true} >
            {/* <div className="container py-md-5"> */}
                <div className="row align-items-center">
                    <div className="col-lg-7 py-3 py-md-5">
                    <h1 className="display-3">Remember Writing?</h1>
                    <p className="lead text-muted">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
                    </div>
                    <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">

    {/* At (L31 2:41) Connected Form: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18216744#overview  */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="username-register" className="text-muted mb-1">
                            <small>Username</small>
                        </label>
                        {/* L70 (9:20) update onChange: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview */}
                            {/* <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" /> */}
                            <input onChange={e => dispatch({type: "usernameImmediately", value: e.target.value})} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
                        {/* L70 (15:00) - add CSS Transition group to display error message: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview */}
                            <CSSTransition in={state.username.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                              <div className="alert alert-danger small liveValidateMessage">{state.username.message}</div>  
                            </CSSTransition>
                        </div>
                        <div className="form-group">
                        <label htmlFor="email-register" className="text-muted mb-1">
                            <small>Email</small>
                        </label>
                        {/* L70 (11:00) update email onChange to use dispatch:   */}
                        <input onChange={e => dispatch({type: "emailImmediately", value: e.target.value})} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password-register" className="text-muted mb-1">
                            <small>Password</small>
                        </label>
                        {/* L70 (11:20) update password onChange to use dispatch */}
                        <input onChange={e => dispatch({type: "passwordImmediately", value: e.target.value})} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
                        </div>
                        <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                        Sign up for an ACME Health Account
                        </button>
                    </form>
                    </div>
                </div>
            {/* </div> */}
        </Page>
    )
}

export default HomeGuest