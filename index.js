const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();



const app = express();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rqwof3p.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try{

    const appointmentOptionsCollection = client.db('doctorsPortal').collection('appointmentOptions');
    const bookingCollection = client.db('doctorsPortal').collection('bookings');

    app.get('/appointmentOptions',async(req,res) => {
      const query = {};
      const options = await appointmentOptionsCollection.find(query).toArray();
      res.send(options);
    });

    /***
     * API naming convention
     * booking
     * app.get('/bookings')
     * app.get('/bookings/:id')
     * app.post('/bookings')
     * app.patch('bookings/:id')
     * app.delete('bookings:id')
     */

    app.post('/bookings',async(req,res) =>{
      const booking = req.body;
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    })

    // app.post('/bookings', async(req,res) => {
    //   const booking = req.body;
    //   console.log(booking);
    //   const result = await bookingCollection.insertOne(booking);
    //   res.send(result);
    // })
    
  }
  finally{

  }
}
run().catch(error => console.error(error.message));


app.get('/', async (req, res) => {
    res.send('doctors portal server is running');
})

app.listen(port, () => console.log(`doctors portal is running on ${port}`));