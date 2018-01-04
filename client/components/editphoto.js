import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import store, {auth, addPhotoToDatabase} from '../store'
import {Result} from './index'
import {Route, Switch, Router, NavLink} from 'react-router-dom'
import history from '../history'
import axios from 'axios'
import Webcam from 'react-webcam'
// import { ImageAnnotatorClient } from '@google-cloud/vision/src/v1';
import {SketchField, Tools} from 'react-sketch';

/**
 * COMPONENT
 */
class Edit extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: ''
    }
    this.setState = this.setState.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/photos/${this.props.match.params.photoid}`)
    .then(res => {
      this.setState({
        file: res.data.file,
        imagePreviewUrl: res.data.imagePreviewUrl,
        width: 640,
        height: 1000
      })
      this.makeCanvas();
    })
    .catch(err => console.error(err))
  }

  makeCanvas(){
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    var imageObj1 = new Image();
    imageObj1.src = this.state.imagePreviewUrl;
    imageObj1.onload = function(){
      ctx.drawImage(imageObj1, 0, 0)
    }

  }

  render(){
    return (
      <div>
        <h2>
        edit photo
        </h2>
          <canvas
          id="myCanvas"
          width={this.state.width}
          height={this.state.height}
          />
      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const EditPhoto = connect(mapState, mapDispatch)(Edit);
export default EditPhoto;

