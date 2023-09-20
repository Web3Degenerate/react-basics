//Added L55 (8:14): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18797676#overview

import React from "react"

import {Link} from 'react-router-dom'

import Page from './Page'

function NotFound(props) {
  return (
        <Page title="Not Found">
            <div className="text-center">
                <h2>Whoops, we cannot find that page.</h2>
            </div>
            <p className="lead text-muted">Try going back <Link to="/">to our homepage</Link> and try again.</p>
            <i>Loaded From: {props.message}</i>
        </Page>
  )
}

export default NotFound

            