//Added in L52 (0:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18594986#overview
import React, { useEffect, useState } from "react"

import Page from './Page'

import {useParams, Link} from 'react-router-dom'

import Axios from 'axios'

import LoadingDotsIcon from './LoadingDotsIcon' //Added in L48 (~2:50): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528068#overview

//L50 add react-markdown
import ReactMarkdown from 'react-markdown'
//L51 add react-tooltip
import {Tooltip as ReactTooltip} from 'react-tooltip' //import {Tooltip as ReactTooltip} from 'react-tooltip' if you want to use a different name for it.


function EditPost() {

  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

//L47 (~3:20): Imported useEffect() from ProfilePosts: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505708#overview   
  //This function will run any time state changes, or parent props passed in run
  useEffect(() => {

  //L48 (3:50) - set up cancel
    const ourRequest = Axios.CancelToken.source() //generates token that can be used


    async function fetchPost() {
        try {
            // const response = await Axios.get(`/post/${id}`)
            //in Axios POST request, the 2nd argument is what you want to send to the server
            // in GET request our cancelToken is the 2nd arguemnt. In POST request, it'd be the third.
            const response = await Axios.get(`/post/${id}`, {cancelToken: ourRequest.token}) //L49 (4:30)

            console.log("EditPost.js useEffect/fetchPost Axios get request for ${username}/posts returned: ", response)
            setPost(response.data)
            setIsLoading(false)
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

  // if (isLoading) return <Page title="...">Loading...</Page>
  if (isLoading) 
    return (
        <Page title="...">
          <LoadingDotsIcon />
        </Page>
      )


//Format dateTime to formatted Date: 
const date = new Date(post.createdDate)
const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title="Edit Post">

    {/* <form onSubmit={handleSubmit}> */}
    <form>

        <div className="form-group">
        <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
        </label>
{/* autofocus becomes autoFocus in JSX  */}
        {/* <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" /> */}
        <input value={post.title} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        
        </div>

        <div className="form-group">
        <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
        </label>
        {/* <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea> */}
        <textarea name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        
        </div>

        <button className="btn btn-primary">Save Changes</button>
    </form> 

</Page>
  )
}

export default EditPost