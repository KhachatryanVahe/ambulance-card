const express=require('express')
const cors = require('cors');
const bodyparser=require('body-parser')
const middleware = require('./range');

const app=express()
const db=require('./server')

app.use(cors());
app.use(middleware);
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

const PORT = process.env.PORT || 5000

app.post('/login', db.login)
app.post('/signup', db.signup)
app.get('/patients', db.getPatients)
app.get('/patients/:id', db.getPatientById)
app.post('/patients', db.addPatient)
app.put('/patients/:id', db.updatePatient)
app.delete('/patients/:id', db.deletePatient)


app.get('/visits', db.getVisits)
app.get('/visits/:id', db.getVisitById)
app.post('/visits', db.addVisit)
app.put('/visits/:id', db.updateVisit)
app.delete('/visits/:id', db.deleteVisit)


app.get('/queue', db.getQueue)
app.get('/queue/:id', db.getQueueById)
app.post('/queue', db.addQueue)
app.put('/queue/:id', db.updateQueue)
app.delete('/queue/:id', db.deleteQueue)


app.listen(PORT, () => console.log(`Listening to the port ${PORT}...`))
