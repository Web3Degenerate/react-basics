import React, {useState, useRef} from 'react'

// import Container from './Container'  // move to page L23 (~10:18)
import Page from './Page'

import Axios from 'axios'

function HomeGuest() {



//From update note: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19689368#overview
    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     try {
    //     await Axios.post("http://localhost:8080/register", { username, email, password })
    //     console.log("User was successfully created.")
    //     } catch (e) {
    //     console.log(e.response.data)
    //     }
    // }

    
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function handleSubmit(e){
        e.preventDefault()
            try {
                // Axios.post(URL SEND Request, ANY DATA SEND TO SERVER)
                // await Axios.post("http://localhost:8080/register", {username: "Howard", email: "Howard@test.com", password: "qwerty123456" })
                // await Axios.post("http://localhost:8080/register", {username: username, email: email, password: password })

                //L37 (~10th min) set baseURL in Main.js
                // await Axios.post("http://localhost:8080/register", {username, email, password })
                await Axios.post("/register", {username, email, password })

                console.log("User was successfully created in handleSubmit")
            } catch (error) {
                console.log("Error from handleSubmit is ",error.response.data)
            }
    }


    return(
        <Page title="Home" wide={true} >
            {/* <div className="container py-md-5"> */}
                <div className="row align-items-center">
                    <div className="col-lg-7 py-3 py-md-5">
                    <h1 className="display-3">Remember Writing?</h1>
                    <p className="lead text-muted">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
                    </div>
                    <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">

    {/* At (L31 2:41) Connected Form: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18216744#overview  */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="username-register" className="text-muted mb-1">
                            <small>Username</small>
                        </label>
                        <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="email-register" className="text-muted mb-1">
                            <small>Email</small>
                        </label>
                        <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password-register" className="text-muted mb-1">
                            <small>Password</small>
                        </label>
                        <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
                        </div>
                        <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                        Sign up for an AWFFL Account
                        </button>
                    </form>
                    </div>
                </div>
            {/* </div> */}
        </Page>
    )
}

export default HomeGuest