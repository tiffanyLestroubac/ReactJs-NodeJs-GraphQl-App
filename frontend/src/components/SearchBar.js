import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

class BodyData extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
    handleInputChange = event => {
      const query = event.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };
  
    getData = () => {
      fetch(`http://localhost:4001/api`)
        .then(response => response.json())
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };
  
    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <div className="searchForm">
          <form>
            <input
              placeholder="LOOK FOR A FLIGHT"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
            <SearchIcon />
          </form>
          <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
        </div>
      );
    }
  }
  export default BodyData;