const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const schema = require("./schema");
var cors = require('cors')

//app.use(  
//    "/graphql", graphqlHTTP({    
//     schema: schema,    
//     graphiql: true  
//    }));


    app.use(cors())
    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
    app.listen(3000, () => {  
     console.log("now listening on port 3000");});