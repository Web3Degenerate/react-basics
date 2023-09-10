//Created in L39: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268564#overview

import React, { useEffect } from "react"

function FlashMessages(props) {
  return (

        <div className="floating-alerts">
                {props.messages.map((msg, index) => {
                    return (
                        <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
                            {msg}
                        </div>
                    )
                })}
        </div>

  )
}

export default FlashMessages