# Back-end test

The goal of this test is to build a GraphQL service for space flight booking.

You have 7 days to complete the test. Feel free to ask questions. Don't stay stuck for too long if you have difficulties or are missing informations.

## Requirements

- The service must be developed with Node.js.
- You must use a Postgres database for storage. Use docker so anyone can run the project directly.
- Use git to version your code.
- You must submit your app by sending your private GitHub repository link

## Technical specifications

### The server

- Use `koa` to create the server.
- Use `apollo-server` to add the graphql endpoint to the server.
- The server must be secured by a simple bearer token.
- The server must run on port `3000`.
- The graphql endpoint must be accessible at `/graphql`.

### Libraries

- Use `knex` for database migration and database querying.
- You can use more libraries if needed.

### Data

You will find two files with some data to help you get started:

- `./planets.json` contains the available planets.
- `./space-centers.json` contains a list of space centers and their planet's code.

Your project should provide a way to generate some flight data in the database for testing.

## Functional specifications

This service is supposed to be used to get informations about planets, space centers, flights and bookings and to schedule and book flights.

### Models

**Planet**

| Field | Type    |
| ----- | ------- |
| id    | integer |
| name  | string  |
| code  | string  |

**Space Center**

| Field       | Type    |
| ----------- | ------- |
| id          | integer |
| uid         | string  |
| name        | string  |
| description | string  |
| latitude    | float   |
| longitude   | float   |

_Relations_:

- **A Planet has many Space centers**

**Flight**

| Field        | Type     |
| ------------ | -------- |
| id           | integer  |
| code         | string   |
| departure_at | datetime |
| seat_count   | integer  |

_Relations_:

- **A Flight has a launching site (space center)**
- **A Flight has a landing site (space center)**

### GraphQL service

#### Types

- **Planet**

  - `id`
  - `name`
  - `code` : 3 letter planet code.
  - `spaceCenters`: Returns the list of **`SpaceCenter`** on this **`Planet`**.

    **arguments**:

    - `limit`: limit the number of items returned (default: 5, max: 10).

- **SpaceCenter**:

  - `id`
  - `uid`: a unique identifier.
  - `name`
  - `description`
  - `planet`
  - `latitude`
  - `longitude`

- **Flight**

  - `id`
  - `code`: a unique 16 byte hexadecimal code generated for each flight.
  - `launchSite`: the **`SpaceCenter`** where the rocket will launch.
  - `landingSite`: the **`SpaceCenter`** where the rocket will land.
  - `departureAt`: the ISO datetime of departure (e.g: 1970-01-01T00:00:00Z).
  - `seatCount`: the number of total seats on the flight.
  - `availableSeats`: the count of availabe seats at the current time.

#### Queries

- `planets`: Returns the list of all planets.

  **Example query**

  ```graphql
  query planets {
    planets {
      id
      name
      code
      spaceCenters(limit: 3) {
        id
      }
    }
  }
  ```

- `spaceCenters`: Returns a paginated list of space centers.

  **arguments**:

  - `page`: page index (starting at 1) (default: 1, min: 1).
  - `pageSize`: number of items returned per page (default: 10, min: 1, max: 100).

  **Example query**

  ```graphql
  query spaceCenters {
    spaceCenters {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        uid
        name
        description
        latitude
        longitude
        planet {
          id
          name
          code
        }
      }
    }
  }
  ```

- `spaceCenter`: Returns a space center.

  **arguments**:

  - `id` : id of the space center.
  - or `uid`: uid of the space center.

  **Example Query**

  ```graphql
  query spaceCenter {
    spaceCenter(uid: "e28f6ef2-62ab-4a22-a778-bef1b32900a6") {
      id
      uid
      name
      description
      planet {
        id
        name
        code
      }
    }
  }
  ```

- `flights`: Returns a list of **`Flight`**.

  **arguments**:

  - `from`: id of a **`SpaceCenter`**.
  - `to`: id of a **`SpaceCenter`**.
  - `seatCount`: number of seats required.
  - `departureDay`: ISO date (e.g 1970-01-01).
  - `page` : deafult: 1, min: 1.
  - `pageSize`: deafult: 10, min: 1 max: 100.

  **Example query**

  ```graphql
  query flights {
    flights(pageSize: 1, page: 3) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        code
        launchSite {
          name
          planet {
            name
          }
        }
        landingSite {
          name
          planet {
            name
          }
        }
      }
    }
  }
  ```

- `flight`: a **`Flight`**

  **arguments**:

  - `id`: **`Flight`** id

  **Example query**

  ```graphql
  query flight {
    flight(id: 1) {
      id
      code
      launchSite {
        name
        planet {
          name
        }
      }
      landingSite {
        name
        planet {
          name
        }
      }
    }
  }
  ```

#### Mutations

- `scheduleFlight`: Create a **`Flight`**.

  **arguments**:

  - `flightInfo`:
    - `launchSiteId`: a **`SpaceCenter`** id.
    - `landingSiteId`: a **`SpaceCenter`** id.
    - `departureAt`: a Date & time of departure.
    - `seatCount`: the number of total seats on this **`Flight`**.

  **Example mutation**

  ```graphql
  mutation scheduleFlight($flight: ScheduleFlightInput!) {
    scheduleFlight(flightInfo: $flight) {
      id
      code
      launchSite {
        name
        planet {
          name
        }
      }
      landingSite {
        name
        planet {
          name
        }
      }
      availableSeats
      seatCount
      departureAt
    }
  }
  ```

## Bonus

If you have extra time and want to have fun you can do the following:

- Use `DataLoader` to improve query performances.
- Add a field `statistics` to the **`SpaceCenter`** type:
  - `averageWeeklyFlightCount`: average flight count per week launched from this space center.
