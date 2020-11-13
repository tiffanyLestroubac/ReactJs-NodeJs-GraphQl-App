const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const graphql = require('graphql')
const joinMonster = require('join-monster')

// Connect to database
const { Client } = require('pg')
const client = new Client({
  host: "localhost",
  user: "tiffany",
  password: "password",
  database: "strapi",
  port: 5432,
})
client.connect()

// Schema definition
    const Planet = new graphql.GraphQLObjectType({
        name: 'Planet',
        fields: () => ({
          id: { type: graphql.GraphQLString },
          name: { type: graphql.GraphQLString },
          code: { type: graphql.GraphQLString }
        })
      });
          
      Planet._typeConfig = {
        sqlTable: 'Planet',
        uniqueKey: 'id',
      }
    const SpaceCenter = new graphql.GraphQLObjectType({
        name: 'SpaceCenter',
        fields: () => ({
          id: { type: graphql.GraphQLString },
          uid: { type: graphql.GraphQLString },
          name: { type: graphql.GraphQLString },
          description: { type: graphql.GraphQLString },
          latitude: { type: graphql.GraphQLString },
          longitude: { type: graphql.GraphQLString },
          idplanet: { type: graphql.GraphQLString }
          
        })
      });
          
      SpaceCenter._typeConfig = {
        sqlTable: 'Planet',
        uniqueKey: 'id',
      }
      const Flights = new graphql.GraphQLObjectType({
        name: 'Flights',
        fields: () => ({
          id: { type: graphql.GraphQLString },
          code: { type: graphql.GraphQLString },
          departure_at: { type: graphql.GraphQLString },
          seat_count: { type: graphql.GraphQLString },
          launching_site: { type: graphql.GraphQLString },
          landing_site: { type: graphql.GraphQLString }
        })
      });
          
      Flights._typeConfig = {
        sqlTable: 'Flights',
        uniqueKey: 'id',
      }


const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
          planets: {
            type: new graphql.GraphQLList(Planet),
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          planet: {
            type: Planet,
            args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
            where: (planetTable, args, context) => `${planetTable}.id = ${args.id}`,
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          }
        })
      })
  const schema = new graphql.GraphQLSchema({ query: QueryRoot });
  
// Create the Express app
const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4001);
 
     