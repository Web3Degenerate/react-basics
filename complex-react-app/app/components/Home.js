//Added in L36: (~2:00): https://www.udemy.com/course/react-for-the-c-of-us/learn/lecture/18264826#overview
import React, { useEffect, useContext } from "react"
import Page from './Page'

//Added StateContext in L44 (11:35): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
import StateContext from '../StateContext'

//Added Immer in L65 (0:45): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896#overview
import {useImmer} from 'use-immer'

//Import LoadingDotsIcon in L65 (4:20): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896?start=225#overview
import LoadingDotsIcon from "./LoadingDotsIcon"

import Axios from 'axios'
import {Link} from 'react-router-dom'

//L65 (~12th min) import Post.js component
import Post from './Post'

function Home() {

  //L44 (10:40) added appContext: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
  const appState = useContext(StateContext) //without import it's just React.useContext()


  //Added useImmer state and useEffect in L64 (~2:00): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896#overview
  const [state, setState] = useImmer({
    isLoading: true, 
    feed: [] //where json posts of other users posts can live
  })


//Add useEffect in L65: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896#overview
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source() //generates token that can be used

    //L65 (~3:00) Pull this useEffect from Profile.js component using Axios.post(`/profile/${username}`,  
    async function fetchData(){
        try {
            //L65 (3:10): change Axios post to getHomeFeed, and the server will know which user based on the token.
            const response = await Axios.post(`/getHomeFeed`, {token: appState.user.token}, {cancelToken: ourRequest.token})
            setState(draft => {
                // draft.profileData = response.data //No longer working with profile. No post feed: 
                draft.isLoading = false;
                draft.feed = response.data;
            })
        } catch(e){
            console.log("Error in Home.js component's useEffect catch block was: ", e)
        }
    }

    fetchData()
    // LL49 (2:15) Setup arrow fn to clean up when this component (ViewSinglePost) is done running or "Unmounted": https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview
    return () => {
        ourRequest.cancel()
    }        

}, []) //Set dependency back to empty, to run once



//L65 (~4:00) set up loading spinner: 
  if (state.isLoading) {
    //return loadingDots component which overrides the main return below while isLoading is true
    return <LoadingDotsIcon />
  }

  return (
    <Page title="Your Feed">

  {/* L44 (11:50) - updated localStorage.getItem() with appState.user.username  */}
        {/* <h2 className="text-center">Hello <strong>{localStorage.getItem("complexappUsername")}</strong>, your feed is empty.</h2> */}
        
        {/* L65 (~5th min) */}
        {/* 
          He used two conditional checks (so we're not checking for less than 0)
            {state.feed.length > 0 && () }
            {state.feed.length == 0 && ()} 
        */}
        {state.feed.length == 0 ? (
          <>
            <h2 className="text-center">Hello <strong>{appState.user.username}</strong>, your feed is empty.</h2>
            <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
          </>
        ) : (

          <>
            {/* if your feed (posts from other users you follow) is not emptyu */}
            <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
            <div className="list-group">
                      {/* {state.feed.map((post) => { */}
    {/* Pass (unique data), the actual current post object that map has looped to as a prop to the Post component and for performance reasons, pass it a key */}
                      {state.feed.map((post) => {
                          
                          return <Post post={post} key={post._id} />

                      })}
            </div>
          </>
        )}
    </Page>
  )
}

export default Home