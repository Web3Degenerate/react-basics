//Added in L52 (0:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18594986#overview
import React, { useEffect, useState, useContext } from "react"
import Page from './Page'
import {useParams, Link} from 'react-router-dom'
import Axios from 'axios'
import LoadingDotsIcon from './LoadingDotsIcon' //Added in L48 (~2:50): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528068#overview

//L52 (9:00): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18594986#overview
import {useImmerReducer} from 'use-immer'

//L53 (10:20) import state wide context to get token for 2nd useEffect axios post request: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18770556#overview
import StateContext from "../StateContext"
// L53 (16:30) bring  in app wide dispatch for the flash message
import DispatchContext from "../DispatchContext"


//L55 (8:45) import NotFound componet
import NotFound from './NotFound'


function EditPost() {

//L53 (10:50) add appState (not state since currently using): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18770556#overview
    const appState = useContext(StateContext)
// L53 (16:30) bring  in app wide dispatch for the flash message
    const appDispatch = useContext(DispatchContext)

//L52 (9:05) add reducer: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18594986#overview
// useImmerReducer(function that serves as our reducer, initial/original state)
    const originalState = {
        //make an object {} if you need multiple properties (11:11 L52)
        title: {
            value: "",
            hasErrors: false,
            message: ""
        },
        body: {
            value: "",
            hasErrors: false,
            message: ""
        },
        isFetching: true,
        isSaving: false,
        id: useParams().id,
        sendCount: 0, 
        notFound: false
    }


    function ourReducer(draft, action){
        switch (action.type) {
            case "fetchComplete": 
                draft.title.value = action.value.title 
                draft.body.value = action.value.body
                draft.isFetching = false
                return //exit case
            case "titleChange":
                //draft.title.hasErrors: false // L54 (15:25) better way turn error flash message off: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18775922#overview
                draft.title.value = action.value
                return 
            case "bodyChange":
                //draft.body.hasErrors: false // L54 (15:25) better way turn error flash message off: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18775922#overview
                draft.body.value = action.value
                return
            case "submitRequest": 
                //L54 check if form hasErrors
                if(!draft.title.hasErrors && !draft.body.hasErrors){
                    draft.sendCount++
                }
                return
            case "saveRequestStarted":
                draft.isSaving = true
                return
            case "saveRequestFinished":
                draft.isSaving = false
                return
            case "titleRules":
                if (!action.value.trim()){ //L54 (5:50) .trim() remove blank spaces
                   draft.title.hasErrors = true
                   draft.title.message = "The title field may not be blank. Please add a title."
                }
                if(action.value.trim()){
                    draft.title.hasErrors = false
                    draft.title.message = ""
                }
                return
            case "bodyRules":
                if (!action.value.trim()){ //L54 (5:50) .trim() remove blank spaces
                    draft.body.hasErrors = true
                    draft.body.message = "The post field may not be blank. Please add a text to this post."
                }
                if(action.value.trim()){
                    draft.body.hasErrors = false
                    draft.body.message = ""
                }
                return
            case "notFound":
                draft.notFound = true
                return
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, originalState)
// L52 (14:28) useImmerReducer replaces these three lines of code:
//   const { id } = useParams()
//   const [isLoading, setIsLoading] = useState(true)
//   const [post, setPost] = useState()

// L53 (4:25) reate submitHandler: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18770556#overview
    function submitHandler(e){
        e.preventDefault()
        dispatch({type: "titleRules", value: state.title.value}) //L54 (11:25) add titleRules to submit, not just onBlur. set hasErrors to true on submit
        dispatch({type: "bodyRules", value: state.body.value}) //L54 (13:35) add titleRules to submit, not just onBlur. set hasErrors to true on submit
     
        dispatch({type: "submitRequest"})
    }

 
  //This function will run any time state changes, or parent props passed in run
  useEffect(() => {

  //L48 (3:50) - set up cancel
    const ourRequest = Axios.CancelToken.source() //generates token that can be used

    async function fetchPost() {
        try {
            // const response = await Axios.get(`/post/${id}`)
            //in Axios POST request, the 2nd argument is what you want to send to the server
            // in GET request our cancelToken is the 2nd arguemnt. In POST request, it'd be the third.
            // const response = await Axios.get(`/post/${id}`, {cancelToken: ourRequest.token}) //L49 (4:30)
            const response = await Axios.get(`/post/${state.id}`, {cancelToken: ourRequest.token}) //L52 (18:10)

            console.log("EditPost.js useEffect/fetchPost Axios get request for ${username}/posts returned: ", response)

//L55 (4:00) wrap in if condition checking if any data came back from the server. 
            if(response.data) {
                    //L52 (15:11) replace with dispatch({type: "varName"})
                    dispatch({type: "fetchComplete", value: response.data})
                    // setPost(response.data)
                    // setIsLoading(false)
            }else{
                    dispatch({type: "notFound"})
            }
        } catch(e) {
            console.log("Error in EditPosts useEffect (or request was cancelled) catch block was: ", e)
        }
    }
    fetchPost() //you can't pass useEffect an async function directly
// LL49 (2:15) Setup arrow fn to clean up when this component (EditPost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
    return () => {
      ourRequest.cancel()
    }
    
  }, [])


  //Second useEffect for submitHandler via dispatch() added L53 (7:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18770556#overview
  useEffect(() => {
      if (state.sendCount) {
        dispatch({type: "saveRequestStarted"})
        const ourRequest = Axios.CancelToken.source() //generates token that can be used
        async function updatePost() {
            try {
                const response = await Axios.post(`/post/${state.id}/edit`, {title: state.title.value, body: state.body.value, token: appState.user.token}, {cancelToken: ourRequest.token}) //L52 (18:10)
    
                console.log("EditPost.js useEffect/updatePost Axios get request for ${username}/posts returned: ", response)
                // dispatch({type: "fetchComplete", value: response.data}) 
                alert("Congrats, post updated.") 
                dispatch({type: "saveRequestFinished"})
                appDispatch({type: "flashMessage", value: "Success! The post was updated."})
            } catch(e) {
                console.log("Error in EditPosts useEffect (or request was cancelled) catch block was: ", e)
            }
        }
        updatePost() //you can't pass useEffect an async function directly
        return () => {
            ourRequest.cancel()
        }
      }
      
    }, [state.sendCount])


//L55 (5:33) added if state.notFound
    if (state.notFound){
        return (
            // <NotFound />
            <NotFound message="EditPost.js"/>
        )
    }


  // if (isLoading) return <Page title="...">Loading...</Page>
  if (state.isFetching) 
    return (
        <Page title="...">
          <LoadingDotsIcon />
        </Page>
      )


//Format dateTime to formatted Date: 
// const date = new Date(post.createdDate)
// const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title="Edit Post">

{/* L55 Add Back Button */}
    <Link className="small font-weight-bold" to={`/post/${state.id}`}>&laquo; Back to Posts List</Link>

    {/* <form onSubmit={handleSubmit}> */}
    <form className="mt-3" onSubmit={submitHandler}>

        <div className="form-group">
        <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
        </label>
{/* autofocus becomes autoFocus in JSX  */}
        {/* <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" /> */}
        {/* <input value={post.title} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" /> */}
        <input onBlur={e => dispatch({type: "titleRules", value: e.target.value})} onChange={(e) => dispatch({type: "titleChange", value: e.target.value})} value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        
        {state.title.hasErrors &&
            <div className="alert alert-danger small liveValidateMessage">{state.title.message}</div>
        }

        </div>

        <div className="form-group">
        <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
        </label>
        {/* <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea> */}
        {/* <textarea name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea> */}
        {/* <textarea name="body" id="post-body" className="body-content tall-textarea form-control" type="text" value={post.body} /> */}
        <textarea onBlur={e => dispatch({type: "bodyRules", value: e.target.value})} onChange={(e) => dispatch({type: "bodyChange", value: e.target.value})} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" value={state.body.value} />
        {state.body.hasErrors &&
            <div className="alert alert-danger small liveValidateMessage">{state.body.message}</div>
        }
        
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
            {state.isSaving ? "Saving..." : "Save Updates"}
        </button>
    </form> 

</Page>
  )
}

export default EditPost