const express = require('express')
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;


// middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xwlx9fx.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        const serviceCollection = client.db('healthCoach').collection('services');




        //get all services
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


         //get specific service
         app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });


    }
    finally {

    }
}
run().catch(err => console.error(err));







app.get('/', (req, res) => {
    res.send('Healthh Coach server is running');
});

app.listen(port, () => {
    console.log(`Healthh Coach server running on ${port}`);
})