//Added L37: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview
import React, { useEffect, useState } from "react"
import Page from './Page'
import Axios from "axios"

function CreatePost() {

    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    async function handleSubmit(e){
        e.preventDefault()
        try {
                                            //name of title and body properties is the same as our value
            await Axios.post('/create-post', {title, body, token: localStorage.getItem("complexappToken")})
            console.log("New post was created from CreatePost.js handleSubmit")
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