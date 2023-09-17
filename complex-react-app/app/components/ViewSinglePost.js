//Added L38: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18282394#overview
import React, { useEffect, useState } from "react"

import Page from './Page'

import {useParams, Link} from 'react-router-dom'

import Axios from 'axios'

function ViewSinglePost() {

  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

//L47 (~3:20): Imported useEffect() from ProfilePosts: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505708#overview   
  //This function will run any time state changes, or parent props passed in run
  useEffect(() => {
    async function fetchPost() {
        try {
            const response = await Axios.get(`/post/${id}`)
            console.log("ViewSinglePost.js useEffect/fetchPost Axios get request for ${username}/posts returned: ", response)
            setPost(response.data)
            setIsLoading(false)
        } catch(e) {
            console.log("Error in ProfilePosts useEffect catch block was: ", e)
        }
    }
    fetchPost() //you can't pass useEffect an async function directly
  }, [])

  if (isLoading) return <Page title="...">Loading...</Page>


//Format dateTime to formatted Date: 
const date = new Date(post.createdDate)
const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={post.title}>

        <div className="d-flex justify-content-between">
            {/* <h2>Example Post Title</h2> */}
            <h2>{post.title}</h2>

            <span className="pt-2">
            <a href="#" className="text-primary mr-2" title="Edit"><i className="fas fa-edit"></i></a>
            <a className="delete-post-button text-danger" title="Delete"><i className="fas fa-trash"></i></a>
            </span>
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
            {post.body}
        </div>

    </Page>
  )
}

export default ViewSinglePost