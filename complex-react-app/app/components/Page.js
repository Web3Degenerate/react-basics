import React, { useEffect } from "react"

import Container from './Container'

function Page(props) {

    useEffect(() => {
        document.title = `${props.title} | AWFFL`
        window.scrollTo(0,0)
    // }, []) // L47 update to look for any change to props.title (9:00): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505708#overview
    }, [props.title])

  return (
    <Container wide={props.wide}>
        {props.children}
    </Container>
  )
}

export default Page