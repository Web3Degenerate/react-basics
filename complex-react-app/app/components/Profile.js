// Added in L45: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
// Source: https://github.com/LearnWebCode/react-course/blob/master/html-templates/profile-posts.html
import React, { useEffect, useContext, useState } from "react"
import Page from './Page'

import {useParams} from 'react-router-dom'
import Axios from 'axios'

import StateContext from '../StateContext' //L45 (13:05): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview


function Profile() {

    //destructure the object that useParams gives us (9:11)
    const {username} = useParams() //L45 returns object with potentially many different properties, ie /brad/123/etc
//L45 (middle): 
    const appState = useContext(StateContext)
//L45 (16:05): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
    const [profileData, setProfileData] = useState({
        profileUsername: "...",
        profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
        isFollowing: false,
        counts: {postCount: "", followerCount: "", followingCount: ""}
    })


    useEffect(() => {
        //L45 Get around useEffect not directly allowed to use async/await: (11:10): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
        async function fetchData(){
            try {
                const response = await Axios.post(`/profile/${username}`, {token: appState.user.token})
                setProfileData(response.data)
            } catch(e){
                console.log("Error in Profile.js useEffect catch block was: ", e)
            }
        }

        fetchData()

    }, []) //empty array our way of saying, only run this function the very first time this component is rendered.

  return (
    <Page title="Profile Screen">

        <h2>
            {/* <img className="avatar-small" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> */}
            <img className="avatar-small" src={profileData.profileAvatar} /> 
                {/* brad */}
                {profileData.profileUsername}
            <button className="btn btn-primary btn-sm ml-2">Follow <i className="fas fa-user-plus"></i></button>
        </h2>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
            <a href="#" className="active nav-item nav-link">
            {/* Posts: 3 */}
            Posts: {profileData.counts.postCount}
            </a>
            <a href="#" className="nav-item nav-link">
            {/* Followers: 101 */}

            Followers: {profileData.counts.followerCount}
            </a>
            <a href="#" className="nav-item nav-link">
            {/* Following: 40 */}
            Following: {profileData.counts.followingCount}
            </a>
        </div>

        <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #1</strong>
            <span className="text-muted small">on 2/10/2020 </span>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #2</strong>
            <span className="text-muted small">on 2/10/2020 </span>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #3</strong>
            <span className="text-muted small">on 2/10/2020 </span>
            </a>
        </div>

    </Page>
  )
}

export default Profile