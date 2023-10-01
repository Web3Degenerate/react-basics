import React, { useEffect, useContext } from "react"

//L57 (9:10) import DispatchContext and StateContext
        //From HeaderLoggedIn.js see DispatchContext in L40 (14:00)
import DispatchContext from '../DispatchContext'
        //From HeaderLoggedIn.js see StateContext in L44 (10:25): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview
// import StateContext from '../StateContext'

function Search() {

    const appDispatch = useContext(DispatchContext)
    // const appState = useContext(StateContext)

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

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="Type here to search for a post" />
            
            {/* <span onClick={handleCloseSearch} className="close-live-search"> */}
            <span onClick={() => appDispatch({type: "closeSearch"})} className="close-live-search">
                <i className="fas fa-times-circle"></i>
            </span>

        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className="live-search-results live-search-results--visible">
            <div className="list-group shadow-sm">
              <div className="list-group-item active"><strong>Search Results</strong> (3 items found)</div>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #1</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" /> <strong>Example Post #2</strong>
                <span className="text-muted small">by barksalot on 2/10/2020 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #3</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search