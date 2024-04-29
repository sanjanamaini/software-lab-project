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
        // console.log(req.headers);
        // const { room_number, tower, capacity, occupied } = req.headers;
        // console.log(registrationnum, password);
        const query = {
            text: "SELECT * FROM rooms  "
        };
        // console.log(query);
        const { rows } = await pool.query(query);
        // console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.post("/api/room/update", async (req, res) => {
    try {
        const { registrationnum, tower, floor, room } = req.headers;

        const updateStudentQuery = {
            text: "UPDATE students SET tower = $1, floor = $2, room = $3 WHERE registrationnum = $4;",
            values: [tower, floor, room, registrationnum],
        };

        await pool.query(updateStudentQuery);
        // roomnumber = room;
        const updateRoomQuery = {
            text: "UPDATE rooms SET occupied = $1, studentregno = $2 WHERE roomnumber = $3 AND tower = $4 AND floor = $5;",
            values: [1, registrationnum, room, tower, floor],
        };

        await pool.query(updateRoomQuery);

        res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ error: "Error updating room" });
    }
});


app.get("/api/fetch/booking", async (req, res) => {
	try {
		// console.log("in for item check");
		const { registrationnum } = req.headers;
		const query = {
			text: "SELECT * FROM students WHERE registrationnum = $1",
			values: [registrationnum],
		};
		const { rows } = await pool.query(query);
		res.json(rows);
	} catch (error) {
		console.error("Error executing query:", error);
		res.status(500).json({ error: "Error executing query" });
	}
});

app.post("/api/fine", async (req, res) => {
    try {
        const { registrationnum, amt, rsn } = req.headers;
        const query = {
            text: "INSERT INTO fines (regno,amt,rsn) VALUES($1,$2,$3)",
            values: [registrationnum, amt, rsn],

        };
        await pool.query(query);
    }catch (error) {
		console.error("Error executing query:", error);
		res.status(500).json({ error: "Error executing query" });
	}
});

app.post("/api/add/student", async (req, res) => {
    try {
        const { name, registrationnum, department, semester, cgpa, yearofstudy } = req.headers;
        const query = {
            text: "INSERT INTO students (name, registrationnum, department, semester, cgpa, yearofstudy) VALUES ($1, $2, $3, $4, $5, $6)",
            values: [name, registrationnum, department, semester, cgpa, yearofstudy],
        };
        console.log("query captured");
        await pool.query(query);
        console.log("query performed");
        res.status(200).json({ message: "Student added successfully" });
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Error executing query" });
    }
});


app.post("/api/del/student", async (req, res) => {
    try {
        const { registrationnum } = req.headers;
        const query = {
            text: "DELETE FROM students WHERE registrationnum = $1 RETURNING *",
            values: [registrationnum],
        };

        const result = await pool.query(query);

        if (result.rowCount === 0) {
            // No rows affected, student not found
            res.status(404).json({ error: "Student not found" });
        } else {
            // Student deleted successfully
            res.status(200).json({ message: "Student deleted successfully" });
        }

    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Error executing query" });
    }
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
}); 