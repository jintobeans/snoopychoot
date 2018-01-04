import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = (props) => {
  // const {email} = props

  return (
    <div className="container">
      <h2>what would you like to do?</h2>
      <nav>
        <NavLink to="/uploadForm" activeStyle={ { textDecoration: 'bold', color: 'pink'}}>upload snoop from desktop</NavLink>
        <NavLink to="/takePhoto">snoop a snoop</NavLink>
        <NavLink to="/userPhotos">view or edit my snoops</NavLink>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Home)

