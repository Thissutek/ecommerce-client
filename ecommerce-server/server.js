const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pgPromise = require('pg-promise');
const app = express();
const port = 3001;

const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());

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

//User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Hashes the Password with saltRounds
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Saves user into Postgres Database
        const newUser = await db.one(
            'INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        res.json(newUser);
        
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({error: 'Internal Server Error'});
    };
});


//User Authentication

//User Login
app.post('/login', async (req, res) => {
    const { username, password} = rqe.body;

    try {
        //Fetch user from the database
        const user = await db.one('SELECT * FROM user WHERE username = $1', [username]);

        //Compare hashed password
        const match = await bcrypt.compare(password, user.password_hash);

        if(match) {
            //Create token
            const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { 
                expiresIn: '1h', 
            });

            res.json({ token });
        } else {
            res.status(401).json({error: 'Invalid username or password'});
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


//Fetch User's Cart
app.get('/cart', async (req, res) => {


});


//Add Products to Carts
app.post('/cart/add', async (req, res) => {

});


//Update Cart Item Quantity

//Remove Product From Cart

//Place Order

//Fetch User Profile


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});