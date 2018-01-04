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
class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      uploaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // this.props.history.push('/uploadForm/result')
    console.log('handle uploading-', this.state.file)
    axios.post('/api/photos', {file: this.state.file.name, imagePreviewUrl: this.state.imagePreviewUrl})
    .then(res => {
      this.setState({uploaded: true})
      console.log('result', res.data)})
    .catch(err => console.log(err))
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        uploaded: false
      })
    }
    reader.readAsDataURL(file)
  }

  render(){
    let {imagePreviewUrl} = this.state;
    let $imageToPreview = null;
    if (imagePreviewUrl) {
      $imageToPreview = (<img src={imagePreviewUrl} />);
    } else {
      $imageToPreview = (<div className="previewText">please select a snoop :)</div>);
    }
    return (
      <div className="container">
        <div className="uploadContainer">
        <h2>upload a snoop from the desktop!</h2>
          <form
          onSubmit={(e) => {
            this.handleSubmit(e)}}
            >
            <input
              className="chooseFile"
              type="file"
              onChange={(e)=> {this.handleImageChange(e)}}
              />
            <button
            className="submitButton"
            type="submit"
            >
            upload snoop
            </button>
          </form>
            {this.state.uploaded &&
              <div><h3>snoop has been uploaded!</h3>
              <NavLink to="/userPhotos">view snoops</NavLink>
              </div>}
            <br />
            <div className="imgPreview">
            {$imageToPreview}
            </div>
        </div>
      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const UploadForm = connect(mapState, mapDispatch)(Upload);
export default UploadForm;

/*
        <div className="imgPreview">
        {$imageToPreview}
        </div>
*/


/*
old form
      <form
      method='post' action='/upload' enctype='multipart/form-data'>
      <input type='file' name='image' />
      <input type='submit' />
    </form>
*/

/*
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));


      */
