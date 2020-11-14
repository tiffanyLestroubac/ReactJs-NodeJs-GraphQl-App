import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4001/api",
  cache: new InMemoryCache()
});

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
  query SPACECENTERSBYPLANET{
    spacecenterbyplanet (idplanet:1){ 
        id
        name
        idplanet
        code
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

class PlanetsAndSpace extends React.Component{
    render(){
      return(
      <div>
        <ApolloProvider client={client}>
            <Planets />
            <GetSpaceCenter />
        </ApolloProvider>
      </div>
      )
    }
  }

  export default PlanetsAndSpace;
