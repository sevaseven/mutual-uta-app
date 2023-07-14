import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PublicRoute = ({
    component: Component,
    noRedirect,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={(props) => (
                (sessionStorage.getItem("token") || localStorage.getItem("token")) && !noRedirect
                    ? 
                        (<Redirect to="/" />)
                    : 
                        (<Component {...props}></Component>)
            )
            }
        />
    )
}
PublicRoute.propTypes = {
    component: PropTypes.func.isRequired
}