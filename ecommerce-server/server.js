const express = require('express');
const pgPromise = require('pg-promise');
const app = express();
const port = 3001;

const cors = require('cors');

app.use(cors());

const pgp = pgPromise();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'store',
    user: 'postgres',
    password: 'postgres'
});

app.get('/product', async (req, res) => {
    try {
        const products = await db.any('SELECT * FROM product');
        res.json(products);
    } catch (error) {
        console.log('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});