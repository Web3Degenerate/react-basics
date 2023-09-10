import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import HeaderLoggedOut from './HeaderLoggedOut'
import HeaderLoggedIn from './HeaderLoggedIn'

function Header(props) {  //added props parameter in L36 (~7:00)

//Added state (4:47): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview
  // const [loggedIn, setLoggedIn] = useState(false)
//Updated state (5:18): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview
// Moved to Main.js (lifted state up) in L36 (5:20): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview
  // const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))

    return (
            <header className="header-bar bg-primary mb-3">
              <div className="container d-flex flex-column flex-md-row align-items-center p-3">
                <h4 className="my-0 mr-md-auto font-weight-normal">
                  <Link to="/" className="text-white">
                    AWFFL <br></br>Hall of Records
                  </Link>
                </h4>
                
{/* Ternary operator added (5th min): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview */}
                {/* <HeaderLoggedOut /> */}
                {/* <HeaderLoggedIn /> */}

{/* L36 (7:20) add props.loggedIn: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview  */}
                {/* {loggedIn ? <HeaderLoggedIn setLoggedIn={setLoggedIn} /> : <HeaderLoggedOut setLoggedIn={setLoggedIn} />} */}
                {/* {props.loggedIn ? <HeaderLoggedIn setLoggedIn={props.setLoggedIn} /> : <HeaderLoggedOut setLoggedIn={props.setLoggedIn} />} */}

                {/* L40 (13:21) Take out props.setLoggedIn manually passed in and useContext instead: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391868#overview */}
               {/* then go into HeaderLoggedIn and HeaderLoggedOut and add useContext to both */}
               {props.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}



                {/* Added login Component in https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18231522#overview  */}
                    {/* <form className="mb-0 pt-2 pt-md-0">
                      <div className="row align-items-center">
                        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                          <input name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
                        </div>
                        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                          <input name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
                        </div>
                        <div className="col-md-auto">
                          <button className="btn btn-success btn-sm">Sign In</button>
                        </div>
                      </div>
                    </form> */}

              </div>
            </header>
    )
}

export default Header