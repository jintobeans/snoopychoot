import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import store, {auth, addPhotoToDatabase} from '../store'
import {Result} from './index'
import {Route, Switch, Router, NavLink} from 'react-router-dom'
import history from '../history'
import axios from 'axios'
// import { ImageAnnotatorClient } from '@google-cloud/vision/src/v1';

/**
 * COMPONENT
 */
class Photos extends Component {
  constructor(props){
    super(props)
    this.state = {
      photos: []
    };
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount(){
    axios.get('/api/photos')
    .then(allphotos => {
      this.setState({photos: allphotos.data})
    })
  }

  handleEdit(e){
    e.preventDefault()
    axios.post(`/api/photos/${e.target.name}`)
    .then(res => console.log(res.data))
  }

  handleDelete(e){
    e.preventDefault()
    console.log('delete event', e.target.name)
    axios.delete(`/api/photos/${e.target.name}`)
    .then(res => console.log(res.data))
  }

  render(){
    return (
      <div className="container">
        <h2>
          my snoops
        </h2>
        <div id="photoBox">
        {(this.state.photos[0]) &&
          this.state.photos.map((photo) => {
          return (
            <div key={photo.id} className="photo">
              <form>
                <img src={photo.imagePreviewUrl} />
                <br />
                <NavLink to={`/userPhotos/${photo.id}`}>
                  <button name={photo.id} >edit</button>
                </NavLink>
                <button name={photo.id} onClick={this.handleDelete}>x</button>
              </form>
            </div>
          )
        })}
        </div>
      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const UserPhotos = connect(mapState, mapDispatch)(Photos);
export default UserPhotos;
