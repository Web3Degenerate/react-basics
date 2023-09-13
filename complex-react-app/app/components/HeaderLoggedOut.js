import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios';

//Added context in L40 (14:00)
import DispatchContext from '../DispatchContext'

//Built out: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18231522#overview

function HeaderLoggedOut(props) {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    
    //de-structure property setLoggedIn from object {} ExampleContext in L40 (14:15): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview
    // const {setLoggedIn} = useContext(ExampleContext)
    
// L42 (10:51):  https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview
    const appDispatch = useContext(DispatchContext)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            //L37 (~10th min) set baseURL in Main.js
            // const response = await Axios.post('http://localhost:8080/login', {username, password})
            const response = await Axios.post('/login', {username, password})

            console.log(response.data)

            if (response.data) {
                console.log("HeaderLoggedOut => handleSubmit successful loggin attempt returned: ", response.data)

// Added localStorage in L35 (2:20): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview
                // localStorage.setItem(a, b) 

 //Replaced localStorage.setItem() in L44 useEffect: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview     
            /* MOVED TO MAIN.js IN L44 (7:45)                      
                localStorage.setItem("complexappToken", response.data.token)
                localStorage.setItem("complexappUsername", response.data.username)
                localStorage.setItem("complexappAvatar", response.data.avatar)
            */

// Added props.setLoggedIn(true) in L34 @7:42: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview
                // props.setLoggedIn(true)
        // setLoggedIn(true) //pull from useContext in L40

    // L42 (10:26) change setLoggedIn(false) to appDispatch({type: "logout"}): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18405574#overview
            // setLoggedIn(false) //pull from useContext in L40
 //Replaced localStorage.setItem() in L44 useEffect and added to appDispatch: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18461928#overview     
                appDispatch({ type: "login", data: response.data })

            } else {
                console.log("Incorrect username / password")
            }

        } catch(e){
            console.log("There was a problem in HeaderLoggedOut handleSubmit", e)
        }

    }

  return (

        <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
            </div>
            <div className="col-md-auto">
                <button className="btn btn-success btn-sm">Sign In</button>
            </div>
            </div>
        </form>
  )
}

export default HeaderLoggedOut