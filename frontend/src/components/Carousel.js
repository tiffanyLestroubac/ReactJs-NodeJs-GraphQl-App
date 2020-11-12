import React from 'react'
import Carousel, { consts } from 'react-elastic-carousel';
import Card from '../components/Card'

class Slider extends React.Component {
    state = {
        items: [
          {id: 1, title: 'item #1'},
          {id: 2, title: 'item #2'},
          {id: 3, title: 'item #3'},
          {id: 4, title: 'item #4'},
          {id: 5, title: 'item #5'}
        ]
      }
    render() {
        const { items } = this.state;
      return (
        <div className="styling-example">
        <Carousel itemsToShow={2}>
            {items.map(item => <div key={item.id}>{item.title}</div>)}
        </Carousel>
      </div>
      );
    }
  }
      
  export default Slider;