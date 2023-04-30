require('dotenv').config()
const Pool = require('pg').Pool

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASS } = process.env

const pool = new Pool({
  host: PG_HOST,
  port: PG_PORT || 5432,
  database: PG_DB,
  user: PG_USER,
  password: PG_PASS
})

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
      'INSERT INTO visits("patientId", "visitDate", department, "doctorName", "providedService", "paymentKey", "paymentStatus", "dischrgeDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
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
    const { rows } = await pool.query('SELECT * FROM visits');
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
        'UPDATE visits SET "patientId" = $1, "visitDate" = $2, department = $3, "doctorName" = $4, "providedService" = $5, "paymentKey" = $6, "paymentStatus" = $7, "dischrgeDate" = $8 WHERE id = $9 RETURNING *',
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
    const result = await pool.query('SELECT * FROM queue');
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