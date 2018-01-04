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
// import {SketchField, Tools} from 'react-sketch';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from './../src';


/**
 * COMPONENT
 */
class Edit extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: [],
      saved: false,
      width: 640,
      height: 1000,
      states: [],
      step: 0
    }
    this.onSave = this.onSave.bind(this)
    this.doSomething = this.doSomething.bind(this)
    // this.undo = this.undo.bind(this)
    // this.redo = this.redo.bind(this)
    this.filter = this.filter.bind(this)
    this.goog = this.goog.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/photos/${this.props.match.params.photoid}`)
    .then(res => {
      let imageObject = new Image()
      imageObject.src = res.data.imagePreviewUrl
      imageObject.onload = () => {
          this.setState({
            width: imageObject.width,
            height: imageObject.height,
          })
      }
      this.setState({
        file: res.data.file,
        imagePreviewUrl: res.data.imagePreviewUrl,
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
    // this.state.states.push(imageObj1)
  }

  onSave(e){
    console.log('going to save image', e)
    const canvas = document.getElementById('myCanvas')

    let dataURL = canvas.toDataURL();

    axios.post(`/api/photos/${this.props.match.params.photoid}`, {imagePreviewUrl: dataURL})
    .then(res => console.log('result', res.data))
    .catch(err => console.log('err', err))
    this.setState({
      saved: true
    })
  }

  doSomething(i){
    console.log('changed image', i)
    this.setState({
      saved: false
    })
    // const ctx = document.getElementById('myCanvas').getContext('2d');

    // this.setState({
    //   step: this.state.step + 1
    // })

    // this.state.states.push(document.getElementById('myCanvas').toDataURL())
    // function cPush() {
    //     cStep++;
    //     if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    //     cPushArray.push(document.getElementById('myCanvas').toDataURL());
    // }
  }

  // undo(e){
  //   console.log('thing undo', e)
  // //   const ctx = document.getElementById('myCanvas').getContext('2d');
  // //   if (this.state.step > 0) {
  // //     this.setState({
  // //       step: this.state.step - 1
  // //     })
  // //     let canvasPic = new Image();
  // //     canvasPic.src = this.state.states[this.state.step];
  // //     canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  // // }
  // }

  // redo(e){
  //   console.log('thing redo', e)
  // }

  clear(e){
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var imageObj1 = new Image();
    imageObj1.src = this.state.imagePreviewUrl;
    imageObj1.onload = function(){
      ctx.drawImage(imageObj1, 0, 0)
    }
  }

  filter(e){
    let filterToApply = e.target.name
    console.log('filterToApply', filterToApply)
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
  }

  goog(e){
    console.log('hello', e)
  }

  render(){
    const { file, imagePreviewUrl, tool, size, color, fill, fillColor, items } = this.state;

    return (
      <div>
        <h2>
        edit photo
        </h2>

          <div style={{float:'left', marginRight:20}}>
          <SketchPad
            width={this.state.width}
            height={this.state.height}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            onCompleteItem={(i) => this.doSomething(i)}
          />
        </div>
        <div style={{float:'left'}}>
          <div className="tools" style={{marginBottom:20}}>
            <button
              style={tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL})}
            >Pencil</button>
            <button
              style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            >Line</button>
            <button
              style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            >Ellipse</button>
            <button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            >Rectangle</button>
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
          </div>
          {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <label htmlFor="">with color:</label>
                  <input type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                </span> : ''}
            </div> : ''}
          <div className="filter" style={{marginBottom:20}}>
            <label htmlFor="">filter:</label>
            <button name="gray" onClick={(e) => this.filter(e)}>gray</button>
          </div>
          <div className="buttons" style={{marginBottom:20}}>
            <label htmlFor="">clear:</label>
            <button onClick={(e) => this.clear(e)}>clear</button>
          </div>
          <div className="save" style={{marginBottom:20}}>
            <label htmlFor="">save?</label>
            <button onClick={(e) => this.onSave(e)}>save</button>
            {this.state.saved && <div>
              <h4>saved the snoop!</h4>
              </div>}
          </div>
          <div className="goog" style={{marginBottom:20}}>
            <label htmlFor="">goog:</label>
            <button onClick={(e) => this.goog(e)}>goog</button>
          </div>
          <div className="userPhotos" style={{marginBottom:20}}>
            <NavLink to="/userPhotos">back to my snoops</NavLink>
          </div>
        </div>
      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const EditPhoto = connect(mapState, mapDispatch)(Edit);
export default EditPhoto;

