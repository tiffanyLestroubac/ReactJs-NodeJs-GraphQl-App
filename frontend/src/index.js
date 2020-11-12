import React, { useState }  from 'react';
import './styles/style.scss';
import 'bootstrap-4-grid/css/grid.min.css';
import App from './App';

import { render } from 'react-dom';

import Button from '@material-ui/core/Button';
import Currency from './components/Currency'
import ToDo from './components/ToDo'
import Welcome from './components/Welcome'


function Appi() {
  return (
    
       <div className="bootstrap-wrapper">
        <div className="app-container container">
          <div className="row">
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <Welcome name="Ambre" />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <Button variant="contained" color="primary" >
                Hello World
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <h4>Taux d'échange</h4>    
                <Currency />
            </div>
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                  <h4>Donut Chart Container</h4>
                    <ToDo />
                </div>
                <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                  <div className="percentage-container">
                  </div>
                  <div className="percentage-container">
                    <p>TARGET SALES</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <h4>Bar Chart Container</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <h4>Grid Container</h4>
                </div>
              </div>
            </div>
          </div>
          <h4 style={{ display: 'none' }}></h4>
        </div>
      </div>
  );
}

render(<Appi />, document.getElementById('root'));





