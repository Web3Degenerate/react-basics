import React, { useEffect, useContext } from "react"

//L57 (9:10) import DispatchContext and StateContext
        //From HeaderLoggedIn.js see DispatchContext in L40 (14:00)
import DispatchContext from '../DispatchContext'
        //From HeaderLoggedIn.js see StateContext in L44 (10:25): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
// import StateContext from '../StateContext'

//L60 (1:45) import new feature from Immer (not reducer) for post search results: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996922#overview
import { useImmer } from 'use-immer' //similar to useState

//L61 (1:01) set up axios request for searchTerm
// import {Axios} from 'axios'; // {} caused error, unknown "source": const ourRequest = Axios.CancelToken.source()
import Axios from 'axios';

//L62 (4:20) import Link for mapped post results
import {Link} from 'react-router-dom'

//L65 (14:00) import Post component: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896?start=225#overview
import Post from './Post'


function Search() {

    const appDispatch = useContext(DispatchContext)
    // const appState = useContext(StateContext)

//L60 (2:52) - define useImmer() object  with multiple states:
    const [state, setState] = useImmer({
        searchTerm: '',
        results: [],
        show: 'neither',
        requestCount: 0 
    })



    function handleCloseSearch(e) {
        e.preventDefault()
        //L57 (~9:20ish min) - use our app-wide dispatch to send off an action of close search
            // give appDispatch the object type: "closeSearch" case
        appDispatch({type: "closeSearch"})
    }

// LL57 (10:56): Close with Escape Key https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18996914#overview
    useEffect(() => {
        //generic web/javascript way: set up event listener on keyup when page loads
        //L57 (13:34) - CLEAN UP
            // - What happens when this Search.js component is unmounted/removed? 
            // We don't want to keep listening for escape keyboard press
        document.addEventListener("keyup", searchKeyPressHandler)

            //From within useEffect, we can return a cleanup function that runs when Search.js unmounts. (L57 13:49)
            //you could give it a named function but we'll give it an arrow function
        return () => document.removeEventListener("keyup", searchKeyPressHandler)

    }, [])

    function searchKeyPressHandler(e){
        //check if keypress was escape key. Runs every time any key is pressed
        if(e.keyCode == 27){
            appDispatch({type: "closeSearch"})
        }
    }


//L60 (6:40) - 2nd useEffect. NOTE: use `useEffect()` when you want to do something every time a value changes. 
    // useEffect(() => {}, [])
    useEffect(() => {

        //L61 (10:49) - wrap in if clause
        if(state.searchTerm.trim()) { //make sure input is not blank

                setState(draft => { draft.show = 'loading' })
                

                    //Add delay to searchTerm before sending to backend
                    // const delay = setTimeout(function, seconds)
                    const delay = setTimeout(() => {
                        console.log("useEffects delayed searchTerm value is: ", state.searchTerm)
                        //L60 (12:05) - send axios request to another useEffect to make clean up better. Just increment count here by 1
                        setState(draft => { draft.requestCount++ }); //Axios search useEffect watches for changes to requestCount.
                    // }, 3000) //3 seconds
                    }, 750)

                    //return clean up function - L60 (10:40)
                    return () => clearTimeout(delay)
        }else{
            setState(draft => {draft.show = 'neither'})
        }
    }, [state.searchTerm])

//L60 (12:55) - second useEffect that listens for changes to requestCount
    useEffect(() => {
        if (state.requestCount){ //at least 1
            // Send axios request here in L61
            const ourRequest = Axios.CancelToken.source()

            async function fetchResults(){
                try {
                    //Added L61 (~3:40): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049978#overview
                    const response = await Axios.post("/search", { searchTerm: state.searchTerm }, {cancelToken: ourRequest.token})
                    console.log("Search.js mongoDB results from fetchResults was: ",response.data)
                    // console.log(response.data)
                    //L61 (5:40) set IMMER state with response
                    setState(draft => {
                        draft.results = response.data
                        draft.show = 'results'
                    })

                } catch(e) {
                    console.log("There was a problem in Search.js axios useEffect() or the request was cancelled",e)
                }
            }
            //call our async fn
            fetchResults()
            //clean up 
            return () => ourRequest.cancel()
            
        }
    }, [state.requestCount])

//L60 (4:55) - added handleInput
    function handleInput(e){
        //store current value
        const value = e.target.value;
        //call set state and update search term property
        setState(draft => {draft.searchTerm = value}) //useImmer function. ALLOWED to mutate state.
        // console.log("handleInput set value to: ",value)
    }

  return (
    
    <div className="search-overlay">
        <div className="search-overlay-top shadow-sm">
                <div className="container container--narrow">
                    <label htmlFor="live-search-field" className="search-overlay-icon">
                        <i className="fas fa-search"></i>
                    </label>
                    <input onChange={handleInput} autoFocus type="text" autoComplete="off" id="live-search-field" 
                    className="live-search-field" placeholder="Type here to search for a post" />
                        
                        {/* <span onClick={handleCloseSearch} className="close-live-search"> */}
                        <span onClick={() => appDispatch({type: "closeSearch"})} className="close-live-search">
                            <i className="fas fa-times-circle"></i>
                        </span>

                </div>
        </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">

  {/* L61 (6:40) add loading spinner: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049978#overview */}
            <div className={`circle-loader ` + (state.show == 'loading' ? 'circle-loader--visible' : '')}>

            </div>

            {/* <div className="live-search-results live-search-results--visible"> */}
            <div className={`live-search-results ` + (state.show == 'results' ? 'live-search-results--visible' : '')}>


                    {Boolean(state.results.length) && ( //L62 (9:30) Boolean() so we don't display a number? 
                            <div className="list-group shadow-sm">
                                <div className="list-group-item active">
                                    <strong>Search Results</strong> ({state.results.length} {state.results.length !== 1 ? "items" : "item"} found)
                                </div>

                                {/* L62 (2:40) map through search results post: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19049988#overview  */}
                                {state.results.map((post) => {

                    {/* Replace with <Post /> component and PROPS in L65 (~14:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19053896?start=225#overview */}
                                                {/* L65 (15:20) use onClick with code that closes the search overlay */}
                                   return <Post post={post} key={post._id} onClick={() => appDispatch({type: "closeSearch"})} />
                                   
                                    {/* const date = new Date(post.createdDate)
                                    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                                    
                                    return(
                                        <Link onClick={() => appDispatch({type: "closeSearch"})} key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
                                            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> {" "}
                                            <span className="text-muted small"> by {post.author.username} on {dateFormatted} </span>
                                        </Link>
                                    ) */}

                                })}
                            </div>
                    ) }

                    {!Boolean(state.results.length) && <p className="alert alert-danger text-center shadow-sm"> Sorry, no posts match this search.</p>}

            </div>


        </div>
      </div>
    </div>

  )
}

export default Search