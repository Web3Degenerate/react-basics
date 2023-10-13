//Added in L46: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505684#overview

import React, { useEffect, useState } from "react"

import {useParams, Link} from 'react-router-dom'
import Axios from 'axios'

import LoadingDotsIcon from './LoadingDotsIcon' //Added in L48 (~4:05): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528068#overview

//L65 (16:30) Added Post.js component to handle the post query results table
import Post from './Post'

function ProfilePosts() {

    const {username} = useParams()

    // (3:06) - two states we'll need
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])  

//This function will run any time state changes, or parent props passed in run
    useEffect(() => {
        const ourRequest = Axios.CancelToken.source() //generates token that can be used

        async function fetchPosts() {
            try {
                // const response = await Axios.get(`/profile/${username}/posts`)
                const response = await Axios.get(`/profile/${username}/posts`, {cancelToken: ourRequest.token}) //L49 (4:30)
                console.log("ProfilePosts.js useEffect/fetchPosts Axios get request for ${username}/posts returned: ", response)
            //L46 (~9:00)    
                setPosts(response.data)
                setIsLoading(false)

            } catch(e) {
                console.log("Error in ProfilePosts useEffect catch block was: ", e)
            }
        }

        fetchPosts() //you can't pass useEffect an async function directly
// LL49 (2:15) Setup arrow fn to clean up when this component (ViewSinglePost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
        return () => {
            ourRequest.cancel()
        }

    // }, []) LL63 (19:00) add username dependency so profile icon will upload: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053508#overview
    }, [username])


    // if (isLoading) return <div>Loading...</div>
    if (isLoading) return <LoadingDotsIcon />


  return (
    <div className="list-group">

        {posts.map((post) => {

    {/* L65 (16:30) replaced repeating code block below (Home.js, Search.js and this ProfilePosts.js) with <Post /> component and PROPS: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896?start=225#overview  */}
    {/* L65 (~17th min) added noAuthor={true} prop so we don't repeat the same author over and over again when viewing a single user's posts */}
           return <Post noAuthor={true} post={post} key={post._id} /> 
            {/* const date = new Date(post.createdDate)
            const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            return (
                <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
                    <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> {" "}
                    <span className="text-muted small">on {dateFormatted} </span>
                </Link>
            ) */}
        })}
        

        {!posts && (
            <p>There are no posts by this user.</p>
        )}


                {/* <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #2</strong>
                <span className="text-muted small">on 2/10/2020 </span>
                </a>

                <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #3</strong>
                <span className="text-muted small">on 2/10/2020 </span>
                </a> */}
    </div>
  )
}

export default ProfilePosts