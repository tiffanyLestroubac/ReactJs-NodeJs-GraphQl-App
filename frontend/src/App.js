import React, { Component } from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import Currency from './components/Currency'
import ToDo from './components/ToDo'
import Welcome from './components/Welcome'
import Map from './components/Map'
import BodyData from './components/SearchBar'
import Carousel from './components/Carousel'


class App extends Component {
  state = {
    viewport: {}
}
  render() {
    const {viewport} = this.state
    return (
         
      <div className="bootstrap-wrapper">
      <div className="app-container container">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <h1>SPACE TRIPS</h1>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 searchBar">
            <BodyData />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Map component={Map} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Carousel />
          </div>
        </div>
        
      </div>
    </div>
);
}
}

export default App;