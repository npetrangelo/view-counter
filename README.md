This is a toy project to explore writing a stateless microservice with Redis and Postgres. It aggregates views in the cache before updating the DB on every nth request, where n is exposed as parameter called `batchSize` at the top of the file.

The code here should be easily transferrable to a serverless function, with the cache and DB functions modified for the appropriate services.

The views API lives at `/views/:id`.
To start, a POST creates a record in the views API.
Subsequent PUSH requests increment the view count in the cache, and also the DB every n requests.
You can use GET to see what the current view count is.

To run this code,
1. [Install Node](https://nodejs.org/en/download)
2. [Install (and run) Postgres](https://postgresapp.com/downloads.html)
3. [Install Docker](https://docs.docker.com/engine/install/)
4. [Run Redis with Docker](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/docker/)
5. Clone this repository
6. Run `node index.js` in your command line
