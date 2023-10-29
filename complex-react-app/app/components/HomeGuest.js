import React, {useState, useRef, useEffect} from 'react'

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
            isUnique: false,
            checkCount: 0
        },
        email: {
            value: "",
            hasErrors: false, 
            message: "",
            isUnique: false,
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
                //Check if the username contains non-alpha numeric characters:
                                                // .test() metod from regex returns value true/false (L70 (19:00))
                // The Username error message kept triggering because we had a '%' instead of a '$' sign
                if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)){
                    draft.username.hasErrors = true
                    draft.username.message = "Username can only contain letters and numbers."
                }

                return
            case "usernameAfterDelay":
                //delayed verification, like username requried length, wait 800ms after user stopped typing
                //Check if the username is less than 3 characters long
                if (draft.username.value.length < 3) {
                    draft.username.hasErrors = true
                    draft.username.message = "Username can not be less than 3 characters."
                }
                //Don't check databse for duplicate if the username is not valid
                // if(!draft.hasErrors) { //Per L72 Note, !draft.username.hasErrors: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/23016612#overview
                if(!draft.username.hasErrors) {
                    draft.username.checkCount++ //L71 (6:24) set up useEffect to watch for this increment.
                }
                return
            case "usernameUniqueResults": 
                if(action.value){ 
                    //true means username already exists
                    draft.username.hasErrors = true
                    draft.username.isUnique = false
                    draft.username.message = 'Sorry, that username is already in use. Please create another one.'
                }else{
                    //false means username does not already exist and may be used. 
                    draft.username.isUnique = true
                }
                return
            case "emailImmediately": 
                draft.email.hasErrors = false
                draft.email.value = action.value
                return
            case "emailAfterDelay":
                // L71 (12:30)
                if(!/^\S+@\S+$/.test(draft.email.value)){ //if string text not match basic pattern for email
                    draft.email.hasErrors = true
                    draft.email.message = "You must provide a valid email address."
                }
                // L71 (12:55) - check if email address is unique
                if(!draft.email.hasErrors){ //If there are no errors with the provided email address
                    //Increment the email checkCount
                    draft.email.checkCount++ // L71 (13:20) set up useEffect to watch for `draft.email.checkCount++`
                }
                return 
            case "emailUniqueResults": 
                // L71 (14:30) After setting up email useEffect, display non-unique email error here: 
                if(action.value){ //whatever server sends back, true or false
                    //true means username already exists
                    draft.email.hasErrors = true
                    draft.email.isUnique = false
                    draft.email.message = 'Sorry, that email is already being use. Please use another one.'
                }else{
                    //false means email does not already exist and may be used. 
                    draft.email.isUnique = true
                }            
                return
            case "passwordImmediately": 
                draft.password.hasErrors = false
                draft.password.value = action.value
                if(draft.password.value.length > 50){
                    draft.password.hasErrors = true
                    draft.password.message = "Password cannot exceed 50 characters."
                }
                return
            case "passwordAfterDelay": 
                // check minimum password length: 
                if(draft.password.value.length < 12){
                    draft.password.hasErrors = true
                    draft.password.message = "Password must be at least 12 characters."
                }
                return 
            case "submitForm": 
                return
        }
    }

// L70 (9:50) set up our dispatch: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153110#overview
    // const [state, dispatch] = useImmerReducer(reducer, initialState)

//**************** FORGOT TO PASS ourReducer, initialState in L70 (10:05) *******************************************//
                //THIS allows us to actually use dispatch in our registration form: 
    const [state, dispatch] = useImmerReducer(ourReducer, initialState) 


//******************* MUST HAVE useEffect HERE, AFTER the (1) initialState, (2) ourReducer, (3) const [state, dispatch]
// ****************** otherwise we get error, 'cannot initialize state before...' */

//L71 (1:20) set up useEffect to watch for changes to initialState.username [state.username.value] 
// to check that username is not less than 3 chars
// L71: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153116#overview
useEffect(() => {
    //make sure this is not blank (not when component initally renders, only when change ie user types username) 
    if(state.username.value){
     // const delay = setTimeout(function to run, miliseconds to wait)
     // Then in REDCUER define what happens for type 'usernameAfterDelay'
     const delay = setTimeout(() => dispatch({type: "usernameAfterDelay"}), 800) //L71 (3:23) don't have to use {dispatch} if just one statement.

     return () => clearTimeout(delay) //cleanup function, clear our setTimeout
    }
 }, [state.username.value])



// L71 (7:16) - Set up useEffect to trigger checking that userName is unique in our databse
// => Borrowed From Search.js which ran from L60 (12:55) - second useEffect that listens for changes to requestCount
useEffect(() => {
    if (state.username.checkCount){ //at least 1
        // Send axios request here in L61
        const ourRequest = Axios.CancelToken.source()

        async function fetchResults(){
            try {
                //Added L61 (~3:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049978#overview
                // Updated L71 (8:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153116#overview
                const response = await Axios.post("/doesUsernameExist", { username: state.username.value }, {cancelToken: ourRequest.token})
                console.log("HomeGuest.js mongoDB results from fetchResults useEffect was: ",response.data)
                
                //Call dispatch, case `usernameUniqueResults`, server responds either true/false. Give this to our redcuer.
                dispatch({type: "usernameUniqueResults", value: response.data})

            } catch(e) {
                console.log("There was a problem in HomeGuest.js axios fetchResults state.username.email useEffect() or the request was cancelled",e)
            }
        }
        //call our async fn
        fetchResults()
        //clean up 
        return () => ourRequest.cancel()
        
    }
}, [state.username.checkCount])


// L71 (13:40) - Set up useEffect to trigger checking that email is unique in our databse
// => Borrowed From username useEffect above
useEffect(() => {
    if (state.email.checkCount){ //at least 1
        // Send axios request here in L61
        const ourRequest = Axios.CancelToken.source()

        async function fetchResults(){
            try {
                //Added L61 (~3:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049978#overview
                // Updated L71 (8:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153116#overview
                const response = await Axios.post("/doesEmailExist", { email: state.email.value }, {cancelToken: ourRequest.token})
                console.log("HomeGuest.js mongoDB results from fetchResults state.email.checkCount useEffect was: ",response.data)
                
                //Call dispatch, case `emailUniqueResults`, server responds either true/false. Give this to our redcuer.
                dispatch({type: "emailUniqueResults", value: response.data})

            } catch(e) {
                console.log("There was a problem in HomeGuest.js axios fetchResults useEffect() or the request was cancelled",e)
            }
        }
        //call our async fn
        fetchResults()
        //clean up 
        return () => ourRequest.cancel()
        
    }
}, [state.email.checkCount])


// L71 (10:50) Third useEffect to handle Email reducer case: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153116#overview
    // useEffect(() =>{},[])
    useEffect(() => {
        if(state.email.value){
         // const delay = setTimeout(function to run, miliseconds to wait)
         // Then in REDCUER define what happens for type 'emailAfterDelay'
         const delay = setTimeout(() => dispatch({type: "emailAfterDelay"}), 800) //L71 (3:23) don't have to use {dispatch} if just one statement.
    
         return () => clearTimeout(delay) //cleanup function, clear our setTimeout
        }
     }, [state.email.value])

  
// L71 (11:10) - Fourth useEffect to handle Password After Delay reucer case
    useEffect(() => {
        if(state.password.value){
        // const delay = setTimeout(function to run, miliseconds to wait)
        // Then in REDCUER define what happens for type 'passwordAfterDelay'
        const delay = setTimeout(() => dispatch({type: "passwordAfterDelay"}), 800) //L71 (3:23) don't have to use {dispatch} if just one statement.

        return () => clearTimeout(delay) //cleanup function, clear our setTimeout
        }
    }, [state.password.value])       


    // async function handleSubmit(e){
    function handleSubmit(e){
        e.preventDefault()
// L73 (0:30) Add in our rules from our dispatch: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19180030#overview
    //username
        dispatch({type: "usernameImmediately", value: state.username.value})
        dispatch({type: "usernameAfterDelay", value: state.username.value})
    
    //email
        dispatch({type: "emailImmediately", value: state.email.value})
        dispatch({type: "emailAfterDelay", value: state.email.value})        

    //password
        dispatch({type: "passwordImmediately", value: state.password.value})
        dispatch({type: "passwordAfterDelay", value: state.password.value}) 

    //submit form
        dispatch({type: "submitForm"})    

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
                    {/* L71 (17:00) - Add CSS Transition for Email: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153116#overview */}
                            <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                              <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>  
                            </CSSTransition>                        
                        
                        </div>
                        <div className="form-group">
                        <label htmlFor="password-register" className="text-muted mb-1">
                            <small>Password</small>
                        </label>
                        {/* L70 (11:20) update password onChange to use dispatch */}
                            <input onChange={e => dispatch({type: "passwordImmediately", value: e.target.value})} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
                    {/* L71 (17:20) - Add CSS Transition for Email: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19153116#overview */}
                            <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                              <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>  
                            </CSSTransition>                       
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