import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
class UploadedConst extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
      <h1>Pic has been uploaded!</h1>
      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const Result = connect(mapState, mapDispatch)(UploadedConst);
export default Result;

/*
<form method='post' action='/upload' enctype='multipart/form-data'>
        <input type='file' name='image' />
        <input type='submit' />
      </form>
      */
