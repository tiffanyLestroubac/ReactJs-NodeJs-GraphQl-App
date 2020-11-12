import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG9yeXRpZiIsImEiOiJja2hlcncxN2MwOTNtMnRwbDJyMG04aThhIn0.wfWlx9LYOcKMhnOve-eWSw';
class Map extends Component {
    
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 46.232193,
      longitude: 2.209667,
      zoom: 4
    }
  };
    
  render() {
  
     const { viewport } = this.state;
     
    return (
      <ReactMapGL
        width='100%'
        height={500}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}
    
export default Map;