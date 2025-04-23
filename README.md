This is a toy project to explore writing a stateless microservice with the Redis cache and a Database.

The behavior I'm trying for is basically a buffer in front of the DB processing requests into the cache and only
updating the DB on every nth request.

The code here should be easily transferrable to a serverless function, albeit with some configuration changes to connect to the right cache and DB.

To run this code,
1. [Install Node](https://nodejs.org/en/download)
2. [Install (and run) Postgres](https://postgresapp.com/downloads.html)
3. [Install Docker](https://docs.docker.com/engine/install/)
4. [Run Redis with Docker](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/docker/)
5. Clone this repository
6. Run `node index.js` in your command line
