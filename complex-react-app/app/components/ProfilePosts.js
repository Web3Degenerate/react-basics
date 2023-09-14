//Added in L46: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505684#overview

import React, { useEffect, useState } from "react"

import {useParams} from 'react-router-dom'
import Axios from 'axios'

function ProfilePosts() {

    const {username} = useParams()

    // (3:06) - two states we'll need
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])  

//This function will run any time state changes, or parent props passed in run
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await Axios.get(`/profile/${username}/posts`)
                console.log("ProfilePosts.js useEffect/fetchPosts Axios get request for ${username}/posts returned: ", response)
            //L46 (~9:00)    
                setPosts(response.data)
                setIsLoading(false)

            } catch(e) {
                console.log("Error in ProfilePosts useEffect catch block was: ", e)
            }
        }

        fetchPosts() //you can't pass useEffect an async function directly
    }, [])

    if (isLoading) return <div>Loading...</div>

  return (
    <div className="list-group">

        {posts.map((post) => {
            const date = new Date(post.createdDate)
            const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            return (
                <a key={post._id} href="#" className="list-group-item list-group-item-action">
                    <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> {" "}
                    <span className="text-muted small">on {dateFormatted} </span>
                </a>
            )

        })}


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