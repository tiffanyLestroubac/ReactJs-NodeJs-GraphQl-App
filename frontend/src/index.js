import React, { useState }  from 'react';
import ReactDOM from 'react-dom'
import {
    ApolloClient,
    gql
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
      query planets {
          id
          name
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));








