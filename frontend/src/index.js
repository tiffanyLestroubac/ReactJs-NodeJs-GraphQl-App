import React, { useState }  from 'react';
import ReactDOM from 'react-dom'
import {
    ApolloClient,
    gql,
    useQuery
  } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import './styles/style.scss';
import 'bootstrap-4-grid/css/grid.min.css';
import { HttpLink } from 'apollo-link-http'
import { setContext } from '@apollo/client/link/context';
import App from './App';

//const link = new HttpLink({ uri: 'http://localhost:4001/api' })

const link = new HttpLink({
  uri: 'http://localhost:4001/api'
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const cache = new InMemoryCache()
const client = new ApolloClient({
  link:authLink.concat(link),
  cache
})
export default client

client
.query({
  query: gql`
  query GETPLANETS {
    planets {
      id
      code
      name
    }
  }
  `
})
.then(result => console.log(result));


const GET_PLANETS = gql`
query GETPLANETS {
  planets {
    id
    code
    name
  }
}
`;

const GET_SPACE_CENTER_BY_PLANET = gql`
  query SpaceCenters {
    planet(idPlanet: $id) {
      id
      name
    }
  }
`;
 
  function Planets ({ onPlanetSelected }) {
    const { loading, error, data } = useQuery(GET_PLANETS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <select name="planet" onChange={onPlanetSelected}>
        {data.planets.map(planets => (
          <option key={planets.id} value={planets.name}>
            {planets.code}
          </option>
        ))}
      </select>
    );
  }

  

function GetSpaceCenter({id}) {
  const { loading, error, data } = useQuery(GET_SPACE_CENTER_BY_PLANET, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <select name="spacecenter">
        {data.spacecenter.map(spacecenter => (
          <option key={spacecenter.id} value={spacecenter.name}>
            {spacecenter.code}
          </option>
        ))}
      </select>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));








