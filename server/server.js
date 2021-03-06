const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const router = new express.Router();
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM restaurants;');
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: { 'restaurants': results.rows }
        });
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM restaurants WHERE id = $1;', [req.params.id]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: { 'restaurant': results.rows[0] }
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/v1/restaurants/', async (req, res) => {
    try {
        const results = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *;', [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: { 'restaurant': results.rows[0] }
        });
    } catch (error) {
        console.log(error);
    }
});

app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *;', 
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(results);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: { 'restaurant': results.rows[0] }
        });
    } catch (error) {
        console.log(error);
    }
});

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query('DELETE FROM restaurants WHERE id = $1 returning *;', [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: { 'restaurant': results.rows[0] }
        });
    } catch (error) {
        console.log(error);
    }
});



app.listen(port, () => console.log('Server is up and listening on port ' + port));