//Added in L36: (~2:00): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview
import React, { useEffect, useContext } from "react"
import Page from './Page'

//Added StateContext in L44 (11:35): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
import StateContext from '../StateContext'

function Home() {

//L44 (10:40) added appContext: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
const appState = useContext(StateContext) //without import it's just React.useContext()

  return (
    <Page title="Your Feed">

  {/* L44 (11:50) - updated localStorage.getItem() with appState.user.username  */}
        {/* <h2 className="text-center">Hello <strong>{localStorage.getItem("complexappUsername")}</strong>, your feed is empty.</h2> */}
        <h2 className="text-center">Hello <strong>{appState.user.username}</strong>, your feed is empty.</h2>


        <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
    </Page>
  )
}

export default Home