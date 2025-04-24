import express from 'express';
import redis from 'redis';
import pg from 'pg';

const refreshRate = 10;

const app = express();
const port = 3000;

const { Client } = pg;
const db = new Client();
await db.connect();

await db.query(`DROP TABLE IF EXISTS views`);

await db.query(
`CREATE TABLE views (
  id VARCHAR(255),
  count INTEGER
);`);

const createView = (id) => db.query(`INSERT INTO views (id, count) VALUES ('${id}', 1)`);
const updateView = (id, count) => db.query(`UPDATE views SET count = count + ${count} WHERE id = '${id}'`);
const selectView = (id) => db.query(`SELECT count FROM views WHERE id = '${id}'`);

const cacheReset = async (id) => {
    await cache.set(`refresh-${id}`, refreshRate);
    await cache.set(id, 0);
};

const cachePush = async (id) => {
    await cache.decr(`refresh-${id}`);
    await cache.incr(id);
};

const cache = await redis.createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

app.get('/', async (req, res) => {
    res.send('Use /views/:id to access the views API!');
});

app.get('/views/:id', async (req, res) => {
    const { id } = req.params;
    const views = await selectView(id);
    res.send(views);
});

app.post('/views/:id', async (req, res) => {
    const { id } = req.params;
    await cacheReset(id);
    const views = await createView(id);
    res.send(views);
});

app.put('/views/:id', async (req, res) => {
    const { id } = req.params;
    const refresh = await cache.get(`refresh-${id}`);
    if (refresh <= 0) {
        const views = Number(await cache.get(id));
        await cacheReset(id);
        await updateView(id, views);
        res.send('Updated Database');
    } else {
        await cachePush(id);
        res.send('Cached update');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
