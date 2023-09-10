//Added L37: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview
import React, { useEffect, useState, useContext } from "react"
import Page from './Page'
import Axios from "axios"

import ExampleContext from "../ExampleContext"

import {useNavigate} from 'react-router-dom'
              //Add props L39 (11:47): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview
function CreatePost(props) {

    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    //invoke useNavigate
    const navigate = useNavigate()

//useContext added in L40 (7:35): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
    // const addFlashMessage = useContext(ExampleContext)
    //L40 (12:40) - destructure the ExampleContext (from Main.js) object with multiple properties
    const { addFlashMessage }= useContext(ExampleContext)

    async function handleSubmit(e){
        e.preventDefault()
        try {
                                            //name of title and body properties is the same as our value
            const response = await Axios.post('/create-post', {title, body, token: localStorage.getItem("complexappToken")})
            console.log("New post was created from CreatePost.js handleSubmit")
            //Added redirect to new post URL in L38 (5:25): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18282394#overview
            // react-router is managing the browsers history for us. It offers us the useNavigate() function
                    //Add props L39 (11:47): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview
                    // props.addFlashMessage("Success! your post has been saved.")
                    //Remove 'props.' from addFlashMessage now that we are using ExampleContext in L40 (9:25): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
                    addFlashMessage("Success! your post has been saved!")
            navigate(`/post/${response.data}`)
            // setTitle('')
            // setBody('')
        } catch(e) {
            console.log("Error caught in CreatePost.js handleSubmit catch block: ", e)
        }
    }

  return (
    <Page title="Create New Post">

        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="post-title" className="text-muted mb-1">
                <small>Title</small>
            </label>
{/* autofocus becomes autoFocus in JSX  */}
            <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
            </div>

            <div className="form-group">
            <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Body Content</small>
            </label>
            <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
            </div>

            <button className="btn btn-primary">Save New Post</button>
        </form> 

    </Page>
  )
}

export default CreatePost