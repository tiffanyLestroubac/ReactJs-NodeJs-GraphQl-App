const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const graphql = require('graphql')
const joinMonster = require('join-monster')
const cors = require('cors')

// Connect to database
const { Client } = require('pg')
const client = new Client({
  host: "localhost",
  user: "tiffany",
  password: "password",
  database: "strapi",
  port: 5432,
  cors: { origin: "http://localhost:3000", credentials: true },
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
          idplanet:{ type: graphql.GraphQLString },
        })
      });
          
      SpaceCenter._typeConfig = {
        sqlTable: 'SpaceCenter',
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
          landing_site: { type: graphql.GraphQLString },
        })
      });
          
      Flights._typeConfig = {
        sqlTable: 'Flights',
        uniqueKey: 'id',
      }
    
      // Mutation definition
      const MutationRoot = new graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
          planet: {
            type: Planet,
            args: {
              name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
            },
            resolve: async (parent, args, context, resolveInfo) => {
              try {
                return (await client.query("INSERT INTO planet (code, name ) VALUES ($1, $2) RETURNING *", [args.code, args.name])).rows[0]
              } catch (err) {
                throw new Error("Failed to insert new planet")
              }
            }
          },
          spacecenter: {
            type: SpaceCenter,
            args: {
              uid: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              description: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              latitude: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              longitude: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              idplanet: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
            },
            resolve: async (parent, args, context, resolveInfo) => {
              try {
                return (await client.query("INSERT INTO spacecenter (uid, name, description, latitude, longitude, idplanet ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [args.uid, args.name, args.description, args.latitude, args.longitude, args.idplanet])).rows[0]
              } catch (err) {
                throw new Error("Failed to insert new space center")
              }
            }
          },
          flights: {
            type: Flights,
            args: {
              code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              departure_at: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              seat_count: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              launching_site: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
              landing_site: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
            },
            resolve: async (parent, args, context, resolveInfo) => {
              try {
                return (await client.query("INSERT INTO flights (code, departure_at, seat_count, launching_site, landing_site) VALUES ($1, $2, $3, $4, $5) RETURNING *", [args.code, args.departure_at, args.seat_count, args.launching_site, args.landing_site])).rows[0]
              } catch (err) {
                throw new Error("Failed to insert new flight")
              }
            }
          }
        })
      })

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        // Queries for Planets
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
          },
          // Queries for SpaceCenters
          spacecenters: {
            type: new graphql.GraphQLList(SpaceCenter),
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          spacecenterbyplanet: {
            type: new graphql.GraphQLList(SpaceCenter),
            args: { idplanet: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
            where: (spacecenterTable, args, context) => {
                    return `${spacecenterTable}.idplanet= ${args.idplanet}`
            }
            ,
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          spacecenter: {
            type: SpaceCenter,
            args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
            where: (spacecentertable, args, context) => `${spacecentertable}.id = ${args.id}`,
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          flightsbylandingsite: {
            type: new graphql.GraphQLList(Flights),
            args: { landing_site: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
            where: (flightTable, args, context) => {
                return `${flightTable}.landing_site= ${args.landing_site}`    
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          flightsbylaunchingsite: {
            type: new graphql.GraphQLList(Flights),
            args: { launching_site: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
            where: (flightTable, args, context) => {
                return `${flightTable}.launching_site= ${args.launching_site}`
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          // Queries for flights
          flightsbylaunchingandlanding: {
            type: new graphql.GraphQLList(Flights),
            args: { launching_site: { type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
                    landing_site: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }},
            where: (flightTable, args, context) => {
                const whereClause = [];
                if (args.landing_site) {
                    whereClause.push(`${flightTable}.landing_site = ${args.landing_site}`);
                    }
                    if (args.launching_site) {
                    whereClause.push(`${flightTable}.launching_site = ${args.launching_site}`);
                    }
                    return whereClause.join(' AND ');
              },
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          
          flights: {
            type: new graphql.GraphQLList(Flights),
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          },
          flight: {
            type: Flights,
            args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
            where: (flightstable, args, context) => `${flightstable}.id = ${args.id}`,
            resolve: (parent, args, context, resolveInfo) => {
              return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
              })
            }
          }
        })
      })
  const schema = new graphql.GraphQLSchema({ query: QueryRoot, mutation: MutationRoot});
  
// Create the Express app
const app = express();
app.use(cors())
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4001);
 
     