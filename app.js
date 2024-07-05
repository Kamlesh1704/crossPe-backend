const express = require('express');
const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const path = require('path');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

let dbPath = path.join(__dirname,"cross.db");
app.use(cors())
app.use(bodyParser.json());

let port = 3000;
let initializeDBandServer = async () => {
  try{
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })
    app.listen(port,() => {
        console.log(`app is running at ${port}`);
    })
  }catch(e){
    console.log(`Db Error: ${e.message}`);
    process.exit(1);
  }
}

initializeDBandServer();


app.post('/register',async (req,res) => {
  const userData = req.body
  const {id, name, email} = userData
  let Query = `
    INSERT INTO Users(id, name, email)
    VALUES ('${id}', '${name}', '${email}')
  `
  const response = await db.run(Query);
  res.send(response);
})

app.get("/",async (req,res) => {
  const Query = `
    SELECT * FROM Classes`
  const response = await db.all(Query);
  res.send(response)
})

app.post('/book/:id', async (req,res) => {
  const {id}  = req.params
  const {user_id , primaryId } = req.body
  const capacityQueary = `
      SELECT capacity FROM Classes WHERE id=${id}`
  const capacityObj = await db.get(capacityQueary)

  if(capacityObj.capacity >= 1){
    const updatedCapacity = capacityObj.capacity - 1;
    const updateCapacityQuery = `
      UPDATE Classes
      SET capacity = ${updatedCapacity}
      WHERE id = ${id};
    `;
    const updateResponse = await db.run(updateCapacityQuery);    

    const status = 'Booked';
    let Query = `
      INSERT INTO Bookings(id, user_id, class_id, status)
      VALUES ('${primaryId}', '${user_id}', '${id}' , '${status}')
    `
    const response = await db.run(Query);
    res.send({status:status});
    
  }else{
    const status = 'Waiting';
    let Query = `
      INSERT INTO Bookings(id, user_id, class_id, status)
      VALUES ('${primaryId}', '${user_id}', '${id}' , '${status}')
    `
    const response = await db.run(Query);
    res.send({status: status});
  }
})

app.get("/bookings",async (req,res) => {
  const Query = `
    SELECT * FROM Bookings`
  const response = await db.all(Query);
  res.send(response)
})