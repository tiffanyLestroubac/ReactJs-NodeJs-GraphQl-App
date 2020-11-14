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

const GET_FLIGHTS = gql`
query GETFLIGHTS {
  flights {
    code
    departure_at
    seat_count
    launching_site
    landing_site
  }
}
`;


 
  function Flights ({ onFlightSelected }) {
    const { loading, error, data } = useQuery(GET_FLIGHTS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
        <div id="slider">
            <div className="card">
            {data.flights.map(flights => (
                <div className="cardFlight" key="flights.code">
            <p>Numéro de vol : {flights.code}</p>
            <p>Départ : {flights.departure_at}</p>
            <p>Nombre de places : {flights.seat_count}</p>
            <p>Départ de : {flights.launching_site}</p>
            <p>Arrivée à : {flights.landing_site}</p>
            </div>
            ))} 
            </div>
        </div>
    
    );
  }



class AllFlights extends React.Component{
    render(){
      return(
      <div>
        <ApolloProvider client={client}>
            <Flights />
        </ApolloProvider>
      </div>
      )
    }
  }

  export default AllFlights;
