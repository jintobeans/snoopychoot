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

/**
 * COMPONENT
 */
class Take extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      uploaded: false
    };
    this.capture = this.capture.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture(){
    const imageSrc = this.webcam.getScreenshot();
    this.setState({file: imageSrc.slice(10), imagePreviewUrl: imageSrc, uploaded: false})
  }

  uploadPic(e){
    console.log('going to upload to database', e.target)
    axios.post('/api/photos', {file: this.state.file, imagePreviewUrl: this.state.imagePreviewUrl})
    .then(res => {
      this.setState({uploaded: true})
      console.log('result', res.data)})
    .catch(err => console.log(err))
  }

  render(){
    let {imagePreviewUrl} = this.state;
    let $imageToPreview = null;
    if (imagePreviewUrl) {
      $imageToPreview = (<img src={imagePreviewUrl} />);
    } else {
      $imageToPreview = (<div className="previewText">please snoop a snoop</div>);
    }
    return (
      <div>
        <h2>
        snoop a snoop ;)
        </h2>
        <div id="takeBox">
          <div id="cam">
            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350} />
              <br />
            <button onClick={this.capture}>snoop the snoop</button>
          </div>
          <div className="imgPreview">
            <h4>snoop to upload:</h4>
            {this.state.uploaded &&
              <div><h3>snoop has been uploaded!</h3>
              <NavLink to="/userPhotos">view snoops</NavLink>
              </div>
            }
            {$imageToPreview}
            <br />
            <button onClick={this.uploadPic}>upload snoop!</button>
          </div>
        </div>
      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const TakePhoto = connect(mapState, mapDispatch)(Take);
export default TakePhoto;

