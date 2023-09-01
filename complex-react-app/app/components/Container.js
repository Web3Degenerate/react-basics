import React, { useEffect } from "react"

function Container(props) {
  return (
    <>
      {/* <div className="container container--narrow py-md-5"> */}
      <div className={"container py-md-5 " + (props.wide ? '' : "container--narrow")}>

            {props.children}
      </div>
      {/* <div className="container py-md-5"></div> */}
    </>

  )
}

export default Container