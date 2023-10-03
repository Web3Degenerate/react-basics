//Added L38: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18282394#overview
import React, { useEffect, useState, useContext } from "react"

import Page from './Page'

import {useParams, Link, useNavigate } from 'react-router-dom'

import Axios from 'axios'

import LoadingDotsIcon from './LoadingDotsIcon' //Added in L48 (~2:50): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528068#overview

//L50 add react-markdown
import ReactMarkdown from 'react-markdown'
//L51 add react-tooltip
import {Tooltip as ReactTooltip} from 'react-tooltip' //import {Tooltip as ReactTooltip} from 'react-tooltip' if you want to use a different name for it.

//L55 (10:20) import 404 Not Found component
import NotFound from './NotFound'
//L56 (3:32) import context to check if logged in user is author for edit/delete: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18884042#overview
import StateContext from '../StateContext'
//L56 (11:33) import DispatchContext
import DispatchContext from '../DispatchContext'



function ViewSinglePost() {

  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

//L56 (3:56): import state context: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18884042#overview
  const appState = useContext(StateContext)  
//L56 (11:40)
  const appDispatch = useContext(DispatchContext) 
//LL56 (12:40)
  const navigate = useNavigate()

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

            console.log("ViewSinglePost.js useEffect/fetchPost Axios get request for ${username}/posts returned: ", response)
            setPost(response.data)
            setIsLoading(false)
        } catch(e) {
            console.log("Error in ViewSinglePosts useEffect (or request was cancelled) catch block was: ", e)
        }
    }
    fetchPost() //you can't pass useEffect an async function directly
// LL49 (2:15) Setup arrow fn to clean up when this component (ViewSinglePost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
    return () => {
      ourRequest.cancel()
    }
  // }, [])
  }, [id]) //L62 (7:15) add dependency to update selected post via Search.js: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049988#overview


//L55 (10:50) we don't have EditPost's Reducer case function, so here we can trigger the 404 on !post undefined and !isLoading completed: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18797676#overview
  if (!isLoading && !post){ //meaning the loading has completed and no object returned from server (!psot)
    return <NotFound message="ViewSinglePost.js"/>
  }

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

//L56 add isOwner to check if user has permissions to delete their own post only
      function isOwner(){
        if (appState.loggedIn){
          return appState.user.username == post.author.username //return either true or false
        }
        return false //not the author of this post.
      }

//L56 (6:14) set up deleteHandler: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18884042#overview      
     async function deleteHandler(){
        const areYouSure = window.confirm("Do you really want to delete this post?")
        if(areYouSure){
          // alert("post deleted.")
          try {
            const response = await Axios.delete(`/post/${id}`, {data: {token: appState.user.token}})
            if (response.data == "Success"){ //server configured response
              //Step 1. Display flash message
                appDispatch({type: "flashMessage", value: "Post was successfully deleted."})
              //Step 2. Redirect back to the current user's Profile
                navigate(`/profile/${appState.user.username}`)
            }
          }catch(e){
            console.log("error in ViewSinglePost deleteHandler catch block is ", e)
          }
        }
      }

  return (
    <Page title={post.title}>

        <div className="d-flex justify-content-between">
            {/* <h2>Example Post Title</h2> */}
            <h2>{post.title}</h2>


{/* L56 (2:15): check if user owns post: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18884042#overview */}
            {isOwner() && (
                      <span className="pt-2">                                                                                       {/* Browser default: title="Edit" */}
                            <Link to={`/post/${post._id}/edit`} data-tooltip-content="Edit Post" data-tooltip-id="edit" className="text-primary mr-2">
                                <i className="fas fa-edit"></i>          
                            </Link>
                            <ReactTooltip id="edit" className="custom-tooltip" />{" "}

                            <a onClick={deleteHandler} data-tooltip-content="Delete Post" data-tooltip-id="delete" className="delete-post-button text-danger">
                                <i className="fas fa-trash"></i>    
                            </a>
                            <ReactTooltip id="delete" className="custom-tooltip" />
                      </span>
            )}
        </div>

        <p className="text-muted small mb-4">
            <Link to={`/profile/${post.author.username}`}>
                {/* <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> */}
                <img className="avatar-tiny" src={post.author.avatar} />
            </Link>
            
            Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
        </p>

        <div className="body-content">
            {/* <p>Lorem ipsum dolor sit <strong>example</strong> post adipisicing elit. Iure ea at esse, tempore qui possimus soluta impedit natus voluptate, sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat asperiores at.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quod asperiores corrupti omnis qui, placeat neque modi, dignissimos, ab exercitationem eligendi culpa explicabo nulla tempora rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea at esse, tempore qui possimus soluta impedit natus voluptate, sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat asperiores at.</p> */}
            
            {/* {post.body} */}

            {/* L50 - (~4:30) apply react-markdown to post.body */}
              {/* pass children={} the raw text we want react-markdown to interpret */}
            <ReactMarkdown children={post.body} allowedElements={["p", "br", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"]} />

        </div>

    </Page>
  )
}

export default ViewSinglePost