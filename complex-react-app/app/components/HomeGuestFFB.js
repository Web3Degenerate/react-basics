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


    const [qb, setQB] = useState(0)
    const [rbOne, setRBOne] = useState(0)
    const [rbTwo, setRBTwo] = useState(0)

    const qbRef = useRef()
    const rbOneRef = useRef()
    const rbTwoRef = useRef()

    const [displayTotal, setDisplayTotal] = useState()
    const [displayLiveTotal, setLiveDisplayTotal] = useState()
    const [displayLiveRemainingTotal, setDisplayLiveRemainingTotal] = useState()

    const handleDraft = (e) => {
        e.preventDefault()
        let calcTotal = Number(qb) + Number(rbOne) + Number(rbTwo);
        setDisplayTotal(calcTotal)
    }

    const handleUpdateDraft = () => {
        let getQbRef = qbRef.current.value;
        let getRbOneRef = rbOneRef.current.value;
        let getRbTwoRef = rbTwoRef.current.value;

        let calcTotal = Number(getQbRef) + Number(getRbOneRef) + Number(getRbTwoRef);
        setLiveDisplayTotal(calcTotal)

        setDisplayLiveRemainingTotal(200-calcTotal)
    }

    const total = qb + rbOne + rbTwo

    // const max = 200

    const remaining = 200 - total

    async function handleSubmit(e){
        e.preventDefault()
            try {
                // Axios.post(URL SEND Request, ANY DATA SEND TO SERVER)
                // await Axios.post("http://localhost:8080/register", {username: "Howard", email: "Howard@test.com", password: "qwerty123456" })
                await Axios.post("http://localhost:8080/register", {username: username, email: email, password: password })

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



<h2>Total: {displayTotal} vs Live Total: {displayLiveTotal} | Left: {displayLiveRemainingTotal}</h2>
<h3>Live Update: {qb + rbOne + rbTwo}</h3>
<h4>Spent: {total}</h4>
<h4>Remaining: {remaining}</h4>

            <div className="row align-items-center">
                    <div className="col-lg-7 py-3 py-md-5">
                    <h1 className="display-3">Remember Writing?</h1>
                    <p className="lead text-muted">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
                    </div>
                    <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">

    {/* At (L31 2:41) Connected Form: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18216744#overview  */}
                    <form onSubmit={handleDraft} onChange={handleUpdateDraft}>
                            <div className="form-group">
                                <label htmlFor="username-register" className="text-muted mb-1">
                                    <small>Username</small>
                                </label>
                                    <input onChange={e => setQB(e.target.value)} id="qb-register" name="qb" className="form-control" type="number" placeholder="QB" autoComplete="off" value={qb} ref={qbRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email-register" className="text-muted mb-1">
                                    <small>Email</small>
                                </label>
                                <input onChange={e => setRBOne(e.target.value)} id="rb-one-register" name="rb-one" className="form-control" type="number" placeholder="RB1" autoComplete="off" value={rbOne} ref={rbOneRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password-register" className="text-muted mb-1">
                                    <small>Password</small>
                                </label>
                                <input onChange={e => setRBTwo(e.target.value)} id="rb-two-register" name="rb-two" className="form-control" type="number" placeholder="RB2" value={rbTwo} ref={rbTwoRef} />
                            </div>

                        <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                        Update 
                        </button>
                    </form>
                    </div>
                </div>




        </Page>
    )
}

export default HomeGuest