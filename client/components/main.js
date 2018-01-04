import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {logout} from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div>
      <div className="main">

        <NavLink to="/fun"><h1>snoopychoot</h1></NavLink>
        <img src="favicon.ico" width="60" height="60" />
        <nav>
          <div>
              {
                isLoggedIn
                  ? <div>
                    {/* The navbar will show these NavLinks after you log in */}
                    <NavLink exact to="/home">hi</NavLink>
                    <NavLink to="/fun">fun</NavLink>
                    <a href="#" onClick={handleClick}>gtfo</a>
                  </div>
                  : <div>
                    {/* The navbar will show these NavLinks before you log in */}
                    <NavLink to="/login">i have a snoopychoot</NavLink>
                    <NavLink to="/signup">i don't have a snoopychoot</NavLink>
                  </div>
              }
          </div>
        </nav>
      </div>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
