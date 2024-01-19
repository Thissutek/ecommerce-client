const express = require('express');
const pgPromise = require('pg-promise');
const app = express();
const port = 3001;

const cors = require('cors');

app.use(cors());

const pgp = pgPromise();

// Informtion on Postgres Database
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'store',
    user: 'postgres',
    password: 'postgres'
});




//Fetct all Products
app.get('/product', async (req, res) => {
    try {
        const products = await db.any('SELECT * FROM product');
        res.json(products);
    } catch (error) {
        console.log('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Fetch Product Details
app.get('/product/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await db.one('SELECT * FROM product WHERE id = $1', [productId]);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//User Authentication

//User Registration

//User Login

//Fetch User's Cart

//Add Products to Carts

//Update Cart Item Quantity

//Remove Product From Cart

//Place Order

//Fetch User Profile


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});