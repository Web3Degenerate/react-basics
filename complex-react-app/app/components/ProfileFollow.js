// Created ~12th-13th minute of L64: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053886#overview
import React, { useEffect, useState } from "react"

import {useParams, Link} from 'react-router-dom'
import Axios from 'axios'

import LoadingDotsIcon from './LoadingDotsIcon' //Added in L48 (~4:05): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528068#overview

function ProfileFollow(props) {

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
                // const response = await Axios.get(`/profile/${username}/following`, {cancelToken: ourRequest.token}) //L49 (4:30) L64 edited

                const response = await Axios.get(`/profile/${username}/${props.action}`, {cancelToken: ourRequest.token}) 
                // console.log("props.action is ", props.action)
                console.log(`ProfileFollowing.js useEffect/fetchPosts Axios get request for profile/${username}/${props.action} returned: `, response)
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
    }, [username, props.action])


    // if (isLoading) return <div>Loading...</div>
    if (isLoading) return <LoadingDotsIcon />


  return (
    <div className="list-group">
{/* You can call the follower/following variable whatever you want */}
        {posts.map((follow, index) => {
            {/* const date = new Date(post.createdDate)
            const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` */}
            return (
                <Link key={index} to={`/profile/${follow.username}`} className="list-group-item list-group-item-action">
                    <img className="avatar-tiny" src={follow.avatar} /> <strong>{follow.username}</strong>       
                </Link>
            )
        })}

        
            {/* <p>There are no {props.action == 'following' ? "followers" : ''} for {username}. </p> */}
        {!posts.length && isLoading == false && (          
                props.action == 'following' && isLoading == false ? (
                    <b>{username} is not following anyone.</b>
                ) : (
                    <b>There are no followers for {username}.</b>
                )        
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
}ProfileFollow

export default ProfileFollow