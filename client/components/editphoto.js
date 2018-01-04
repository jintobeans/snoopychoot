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
      items: []
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
    const { file, imagePreviewUrl, tool, size, color, fill, fillColor, items } = this.state;

    return (
      <div>
        <h2>
        edit photo
        </h2>
          {/*<canvas
          id="myCanvas"
          width={this.state.width}
          height={this.state.height}
          />*/}

          <div style={{float:'left', marginRight:20}}>
          <SketchPad
            width={500}
            height={500}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            onCompleteItem={(i) => wsClient.emit('addItem', i)}
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
        </div>


      </div>
    )
  }

}

const mapState = null
const mapDispatch = null

const EditPhoto = connect(mapState, mapDispatch)(Edit);
export default EditPhoto;

