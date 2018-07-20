import React, { Component } from 'react';
import './navbar.css';
import image from '../../res/o.png';
import paintBrushIcon from '../../res/paintBrush.svg';
class NavBar extends Component {
  render(){
    return(
      <div className='nav'>
        <div className='icons'><img id='pIcon' src={paintBrushIcon} alt='pI' className='image'/></div>
      </div>
    );
  }
}

export default NavBar;
