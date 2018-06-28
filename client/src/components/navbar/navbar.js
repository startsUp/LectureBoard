import React, { Component } from 'react';
import './navbar.css';
import image from '../../res/o.png';
class NavBar extends Component {
  render(){
    return(
      <div className='nav'>
        <div id='pic'><img id='profilePic' src={image} alt='profilePic' className='image'/></div>
        <div>press</div>
        <div className='hLinks'>
          <div>
          <span className='inlinks'>Projects</span>
          </div>
          <div>
          <span className='inlinks'>Work Experience</span>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
