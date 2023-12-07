const express = require ('express');
require('./db/db_connection.js');
const cors = require('cors');
var bodyParser = require('body-parser')
const studentroute = require('./route/router.js');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


const port = process.env.PORT || 8080;
app.use(express.json());
app.use("/", studentroute);

app.listen(port,()=>{
 console.log(`connection successfull ${port}`)
})
