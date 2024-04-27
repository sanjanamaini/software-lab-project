const express = require("express");
const { Pool } = require("pg");
const cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const pool = new Pool({
	connectionString:
		"postgres://default:q89vaOyAmFhD@ep-rough-wood-a43dmy5f.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
	ssl: {
		rejectUnauthorized: false,
	},
});

app.get("/api/login", async (req, res) => {
    try {
        console.log(req.headers);
        const { registrationnum, password } = req.headers;
        console.log(registrationnum, password);
        const query = {
            text: "SELECT * FROM students WHERE registrationnum=$1 AND password=$2",
            values: [registrationnum, password],
            
        };
        console.log(query);
        const { rows } = await pool.query(query);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.get("/api/all/room/details", async (req, res) => {
    try {
        console.log(req.headers);
        const { room_number, tower, capacity, occupied } = req.headers;
        // console.log(registrationnum, password);
        const query = {
            text: "SELECT * FROM rooms WHERE room_number=$1 AND tower=$2 AND capacity=$3 AND  occupied=$4" ,
            values: [room_number, tower, capacity, occupied],
            
        };
        console.log(query);
        const { rows } = await pool.query(query);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
}); 