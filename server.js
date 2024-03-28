const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');
const { Pool } = require('pg')

const secretKey = 'my_secret_key';
const saltRounds = 10;

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASS } = process.env

const pool = new Pool({
  host: PG_HOST,
  port: PG_PORT || 5432,
  database: PG_DB,
  user: PG_USER,
  password: PG_PASS
})

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user.id }, secretKey);
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};

const signup = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)', [name, username, hashedPassword]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const addPatient = async (req, res) => {
  const patient = req.body;
  if (!patient.id) {
    res.status(400).send('ID is required');
  } else {
    try {
      const checkResult = await pool.query(`SELECT * FROM patients WHERE id = '${patient.id}'`)
      if (checkResult.rows.length > 0) {
        throw new Error('User ID already exists');
      }
      const result = await pool.query(
        'INSERT INTO patients (id, name, phone, "birthDate", address, appa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [patient.id, patient.name, patient.phone, patient.birthDate, patient.address, patient.appa]
      );
      res.send(result.rows[0]);
    } catch (error) {
      console.log(error);
      res.statusMessage = 'Error adding patient to database'
      res.status(500).send(error.message);
    }
  }
};

const getPatients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients');
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.statusMessage = 'Error retrieving patients from database'
    res.status(500).send(error.message);
  }
};

const getPatientById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).send(`Patient with ID ${id} not found`);
    } else {
      res.send(result.rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.statusMessage = `Error retrieving patient with ID ${id} from database`
    res.status(500).send(error.message);
  }
};

const updatePatient = async (req, res) => {
  const id = req.params.id;
  const patient = req.body;
  if (!patient.id) {
    res.status(400).send('ID is required');
  } else if (id !== patient.id) {
    res.status(400).send('ID in URL does not match ID in body');
  } else {
    try {
      const result = await pool.query(
        'UPDATE patients SET name = $1, phone = $2, "birthDate" = $3, address = $4, appa = $5 WHERE id = $6 RETURNING *',
        [patient.name, patient.phone, patient.birthDate, patient.address, patient.appa, id]
      );
      if (result.rows.length === 0) {
        res.status(404).send(`Patient with ID ${id} not found`);
      } else {
        res.send(result.rows[0]);
      }
    } catch (error) {
      console.log(error);
      res.statusMessage = `Error updating patient with ID ${id} in database`
      res.status(500).send(error.message);
    }
  }
};

const deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM patients WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send(`Patient with ID ${id} not found`);
    } else {
      res.send(`Patient with ID ${id} deleted`);
    }
  } catch (error) {
    console.log(error);
    res.statusMessage = `Error deleting patient with ID ${id} from database`
    res.status(500).send(err.message);
  }
}

const addVisit = async (req, res) => {
  const visit = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO visits("patientId", "visitDate", department, "doctorName", "providedService", "paymentKey", "paymentStatus", "dischargeDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [visit.patientId, visit.visitDate, visit.department, visit.doctorName, visit.providedService, visit.paymentKey, visit.paymentStatus, visit.dischargeDate]
    );
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.statusMessage = 'Failed adding visit'
    res.status(500).send(err.message);
  }
};

const getVisits = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      select
        v.id as id,
        "visitDate",
        "providedService",
        d.department as department,
        d.name as "doctorName",
        "paymentKey",
        "paymentStatus",
        "dischargeDate"
      from
        visits v
      join doctors d on
        v.doctorId = d.id
    `);
    console.log('rows', rows);
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.statusMessage = 'Error retrieving visits from database'
    res.status(500).send(err.message);
  }
};

const getVisitById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query('SELECT * FROM visits WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).send(`Visit with ID ${id} not found`);
    } else {
      res.send(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = 'Error retrieving visit'
    res.status(500).send(err.message);
  }
};

const updateVisit = async (req, res) => {
  const id = parseInt(req.params.id);
  const visit = req.body;
  if (visit.id && visit.id !== id) {
    res.status(400).send('ID in URL does not match ID in body');
  } else {
    try {
      const { rows } = await pool.query(
        'UPDATE visits SET "patientId" = $1, "visitDate" = $2, department = $3, "doctorName" = $4, "providedService" = $5, "paymentKey" = $6, "paymentStatus" = $7, "dischargeDate" = $8 WHERE id = $9 RETURNING *',
        [visit.patientId, visit.visitDate, visit.department, visit.doctorName, visit.providedService, visit.paymentKey, visit.paymentStatus, visit.dischargeDate, id]
      );
      if (rows.length === 0) {
        res.status(404).send(`Visit with ID ${id} not found`);
      } else {
        res.send(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.statusMessage = `Error updating visit`
      res.status(500).send(err.message);
    }
  }
}

const deleteVisit = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM visits WHERE id = $1', [id]);
    client.release();
    if (result.rowCount === 0) {
      res.status(404).send(`Visit with ID ${id} not found`);
    } else {
      res.send(`Visit with ID ${id} deleted`);
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = `Error deleting visit`
    res.status(500).send(err.message);
  }
}

const addQueue = async (req, res) => {
  const queueItem = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO queue (name, date, "doctorName", department) VALUES ($1, $2, $3, $4) RETURNING *',
      [queueItem.name, queueItem.date, queueItem.doctorName, queueItem.department]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.message = 'Error adding queue'
    res.status(500).send(err.message);
  }
};

const getQueue = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        q.id as id,
        p.name as name,
        date,
        d.name as "doctorName",
        department
      FROM queue q
      join patients p on q.patientId=p.id
      join doctors d on q.doctorId=d.id
      join queue_dates qd on q.queueDateId=qd.id
    `);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.message = 'Error retrieving queues'
    res.status(500).send(err.message);
  }
};

const getQueueById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM queue WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).send(`Queue item with ID ${id} not found`);
    } else {
      res.send(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.statusMessage = 'Error retrieving queue'
    res.status(500).send(err.message);
  }
};

const updateQueue = async (req, res) => {
  const id = parseInt(req.params.id);
  const queueItem = req.body;
  if (!queueItem.id) {
    res.status(400).send('ID is required');
  } else if (id !== queueItem.id) {
    res.status(400).send('ID in URL does not match ID in body');
  } else {
    try {
      const result = await pool.query(
        'UPDATE queue SET name = $1, date = $2, "doctorName" = $3, department = $4 WHERE id = $5 RETURNING *',
        [queueItem.name, queueItem.date, queueItem.doctorName, queueItem.department, queueItem.id]
      );
      if (result.rows.length === 0) {
        res.status(404).send(`Queue item with ID ${id} not found`);
      } else {
        res.send(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.message = 'Error updating queue'
      res.status(500).send(err.message);
    }
  }
};

const deleteQueue = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM queue WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send(`Queue item with ID ${id} not found`);
    } else {
      res.send(`Queue item with ID ${id} deleted`);
    }
  } catch (err) {
    console.error(err.stack);
    res.statusMessage = 'Error deleting queue'
    res.status(500).send(err.message);
  }
};

module.exports = {
  login,
  signup,

  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,

  addVisit,
  getVisits,
  getVisitById,
  updateVisit,
  deleteVisit,

  addQueue,
  getQueue,
  getQueueById,
  updateQueue,
  deleteQueue
}