import express from 'express';
import redis from 'redis';
import pg from 'pg'

const app = express();
const port = 3000;

const { Client } = pg
const db = new Client()
await db.connect()

const cache = await redis.createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

app.get('/', async (req, res) => {
    const value = await cache.get('key');
    res.send('Hello World! ' + value);
});

app.post('/:value', async (req, res) => {
    await cache.set('key', req.params['value']);
    res.send(req.params);
});

app.post('/views/:id', async (req, res) => {
    await cache.set('id', req.params['id']);
    res.send('Hello World! ' + value);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
