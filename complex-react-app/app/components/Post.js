// created in L65 (~10:30): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896?start=225#overview
import React, { useEffect } from "react"

import {Link} from 'react-router-dom'


// L65 at (12:50) we need to receive the post object data from Home.js as props: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896?start=225#overview
function Post(props) {
//   return (
    // <>
// - (L65 ~11:45) - we don't need a return, just the function in this component

// L65 (13:10) - Rather than appending "props." to every instance of post in our code (via ALT + Click)
// we can instead just create a variable 'post' and set it equal to props.post
// const post = props.post
        const date = new Date(props.post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        
        return(
            <Link onClick={props.onClick} key={props.post._id} to={`/post/${props.post._id}`} className="list-group-item list-group-item-action">
                {/* Later in L65 (~16th min) we added back the close search to link when calling this from Search.js (display table of post results) */}
                {/* Don't need the onClick we imported from Search.js. INSTEAD just call PROPS.onClick to pull the closeSearch logic from Search.js */}
                {/* <Link onClick={() => appDispatch({type: "closeSearch"})} key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action"> */}
                
                <img className="avatar-tiny" src={props.post.author.avatar} /> <strong>{props.post.title}</strong> {" "}
                <span className="text-muted small"> 
                    {!props.noAuthor && <> by {props.post.author.username} </>} on {dateFormatted} 
                </span>
                
            </Link>
        )
{/* </> */}
 {/* ) */}
}

export default Post