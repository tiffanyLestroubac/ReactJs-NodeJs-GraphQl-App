const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const schema = require("./schema");

app.use(  
    "/graphql", graphqlHTTP({    
      schema: schema,    
      graphiql: true  
    }));
  app.listen(3000, () => {  
    console.log("now listening on port 3000");});