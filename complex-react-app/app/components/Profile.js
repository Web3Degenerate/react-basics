// Added in L45: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
// Source: https://github.com/LearnWebCode/react-course/blob/master/html-templates/profile-posts.html
// import React, { useEffect, useContext, useState } from "react" // L63 (2:30) remove useState and use Immer instead for profileData: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053508#overview
import React, { useEffect, useContext } from "react"
import Page from './Page'

import {useParams, NavLink, Routes, Route } from 'react-router-dom' //NavLink, Routes, Route added in L64
import Axios from 'axios'

import StateContext from '../StateContext' //L45 (13:05): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
import ProfilePosts from "./ProfilePosts"

//L62 (2:30) add useImmer
import { useImmer } from 'use-immer'
// import ProfileFollowers from "./ProfileFollowers"
import ProfileFollow from "./ProfileFollow"

function Profile() {

    //destructure the object that useParams gives us (9:11)
    const {username} = useParams() //L45 returns object with potentially many different properties, ie /brad/123/etc
//L45 (middle): 
    const appState = useContext(StateContext)
//L45 (16:05): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
    // const [profileData, setProfileData] = useState({
    //     profileUsername: "...",
    //     profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
    //     isFollowing: false,
    //     counts: {postCount: "", followerCount: "", followingCount: ""}
    // })
//L62 (2:50) replace useState with useImmer for profileData: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053508#overview
    const [state, setState] = useImmer({
        // L62 (3:25) additional properties to help us with follow/unfollow
            //follow request complete or not
            followActionLoading: false,
            startFollowingRequestCount: 0,
            stopFollowingRequestCount: 0,
            profileData: {
                    profileUsername: "...",
                    profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
                    isFollowing: false,
                    counts: {postCount: "", followerCount: "", followingCount: ""}
                }
    })


    useEffect(() => {
        const ourRequest = Axios.CancelToken.source() //generates token that can be used

        //L45 Get around useEffect not directly allowed to use async/await: (11:10): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505680#overview
        async function fetchData(){
            try {
                //L49: in Axios POST request, the 2nd argument is what you want to send to the server
                // in GET request our cancelToken is the 2nd arguemnt. In POST request, it'd be the third.
                // const response = await Axios.post(`/profile/${username}`, {token: appState.user.token})
                const response = await Axios.post(`/profile/${username}`, {token: appState.user.token}, {cancelToken: ourRequest.token})
                // setProfileData(response.data)
                //L63 use setState (Immer) instead of setProfileData (useState)
                setState(draft => {
                    draft.profileData = response.data
                })
            } catch(e){
                console.log("Error in Profile.js useEffect catch block was: ", e)
            }
        }

        fetchData()
        // LL49 (2:15) Setup arrow fn to clean up when this component (ViewSinglePost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
        return () => {
            ourRequest.cancel()
        }        

    // }, []) //empty array our way of saying, only run this function the very first time this component is rendered.
    }, [username]) //Add dependency of `username` so clicking on profile pic will load profile at L63 (18:20)

//L63 (11:00) - 2nd useEffect to listen for change in state.startFollowingRequestCount: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053508#overview
    useEffect(() => {

            if(state.startFollowingRequestCount){ //check that count greater than zero
                        //loading to true
                        setState(draft => {
                            draft.followActionLoading = true
                        })

                        const ourRequest = Axios.CancelToken.source() //generates token that can be used

                        async function fetchData(){
                            try {

                                const response = await Axios.post(`/addFollow/${state.profileData.profileUsername}`, {token: appState.user.token}, {cancelToken: ourRequest.token})
                                // setProfileData(response.data)
                                //L63 use setState (Immer) instead of setProfileData (useState)
                                setState(draft => {
                                    // draft.profileData = response.data
                                    draft.profileData.isFollowing = true
                                    //increment followers by one
                                    draft.profileData.counts.followerCount++
                                    draft.followActionLoading = false
                                })
                            } catch(e){
                                console.log("Error in Profile.js useEffect for start followingcatch block was: ", e)
                            }
                        }

                        fetchData()
                        // LL49 (2:15) Setup arrow fn to clean up when this component (ViewSinglePost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
                        return () => {
                            ourRequest.cancel()
                        }        
            }
    }, [state.startFollowingRequestCount])


//L63 (16:00) - 3rd useEffect to watch state.stopFollowingRequestCount
useEffect(() => {

    if(state.stopFollowingRequestCount){ //check that count greater than zero
                //loading to true
                setState(draft => {
                    draft.followActionLoading = true
                })

                const ourRequest = Axios.CancelToken.source() //generates token that can be used

                async function fetchData(){
                    try {

                        const response = await Axios.post(`/removeFollow/${state.profileData.profileUsername}`, {token: appState.user.token}, {cancelToken: ourRequest.token})
                        // setProfileData(response.data)
                        //L63 use setState (Immer) instead of setProfileData (useState)
                        setState(draft => {
                            // draft.profileData = response.data
                            draft.profileData.isFollowing = false
                            //increment followers by one
                            draft.profileData.counts.followerCount--
                            draft.followActionLoading = false
                        })
                    } catch(e){
                        console.log("Error in Profile.js useEffect catch block for stop following was: ", e)
                    }
                }

                fetchData()
                // LL49 (2:15) Setup arrow fn to clean up when this component (ViewSinglePost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
                return () => {
                    ourRequest.cancel()
                }        
    }
}, [state.stopFollowingRequestCount])

    function startFollowing() {
        setState(draft => {
            //mutate exact property interested in
            draft.startFollowingRequestCount++
        })
    }

    function stopFollowing() {
        setState(draft => {
            //mutate exact property interested in
            draft.stopFollowingRequestCount++
        })
    }


  return (
    <Page title="Profile Screen">

        <h2>
            {/* <img className="avatar-small" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> */}
            {/* <img className="avatar-small" src={profileData.profileAvatar} />  L63 (5:20) */}
            <img className="avatar-small" src={state.profileData.profileAvatar} /> 
                {/* brad */}
                {/* {profileData.profileUsername} */}
                {state.profileData.profileUsername}

            {/* Logged in to view AND not already following AND not your profile AND not loading '...' */}
            {appState.loggedIn && !state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != '...' && (
                    <button onClick={startFollowing} disabled={state.followActionLoading} className="btn btn-primary btn-sm ml-2">
                        Follow <i className="fas fa-user-plus"></i>
                    </button>
            )}
{/* Add unfollow button */}
            {appState.loggedIn && state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != '...' && (
                    <button onClick={stopFollowing} disabled={state.followActionLoading} className="btn btn-danger btn-sm ml-2">
                        Unfollow <i className="fas fa-user-times"></i>
                    </button>
            )}

        </h2>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">

            {/* L64 (2:20) change <a> links to <NavLinks> */}
                {/* <a href="#" className="active nav-item nav-link"> */}
    {/* If Profile.js component is rendered we know means /profile/username via main.js  */}
    {/* end makes sure it is not active if one of the other links is active? (L64) (4:53) */}
                <NavLink to="" end className="nav-item nav-link">
                        {/* Posts: 3 */}
                        {/* Posts: {profileData.counts.postCount} */}
                        Posts: {state.profileData.counts.postCount}
                </NavLink>

                <NavLink to="followers" className="nav-item nav-link">
                    {/* Followers: 101 */}
                    {/* Followers: {profileData.counts.followerCount} */}
                    Followers: {state.profileData.counts.followerCount}
                </NavLink>

                <NavLink to="following" className="nav-item nav-link">
                    {/* Following: 40 */}
                    {/* Following: {profileData.counts.followingCount} */}
                    Following: {state.profileData.counts.followingCount}
                </NavLink>
        </div>

            <Routes>
                <Route path="" element={ <ProfilePosts /> } />
                {/* <Route path="followers" element={ <ProfileFollowers /> } /> 
                <Route path="following" element={ <ProfileFollowing /> } /> */}

                <Route path="followers" element={ <ProfileFollow action="followers" /> } /> 
                <Route path="following" element={ <ProfileFollow action="following" /> } />

            </Routes>

            {/* <ProfilePosts /> */}


{/* Moved to X component in L46: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505684#overview  */}
        {/* <div className="list-group">
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
        </div> */}

    </Page>
  )
}

export default Profile