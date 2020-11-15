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

const GET_ALL_SPACE_CENTER = gql`
  query SPACECENTERS{
    spacecenters { 
        id
        name
        idplanet
        planet{
            name
          }
        flight{
            id
        }
      }
  }
`;


  function Planets ({ onPlanetSelected }) {
    const { loading, error, data } = useQuery(GET_PLANETS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <select name="planet" onChange={onPlanetSelected}>
            <option key="default" value="Tous">Tous</option>
            {data.planets.map(planets => (
            <option key={planets.id} value={planets.name}>
              {planets.name}
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


function GetAllSpaceCenters() {
    const { loading, error, data } = useQuery(GET_ALL_SPACE_CENTER);
 
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    return (
        <div id="slider">
            <div className="card">
                {data.spacecenters.map(spacecenter => (
                    <div className="cardFlight" key={spacecenter.id}>
                <h2>{spacecenter.name}</h2>
                <h3>{spacecenter.planet.name}</h3>
                <div className="allFlightButton" > 
                    <h3>SEE ALL FLIGHTS</h3>
                </div>
                <div key={spacecenter.uid}> 
                <h2></h2>
                </div>
                </div>
               
                ))} 
            </div>
        </div>
    );
  }


class PlanetsAndSpace extends React.Component{
    render(){
      return(
      <div>
        <ApolloProvider client={client}>
            <GetAllSpaceCenters />
        </ApolloProvider>
      </div>
      )
    }
  }

  export default PlanetsAndSpace;
