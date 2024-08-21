const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0pky6me.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const perfumeCollection = client.db("scentraDB").collection("perfumes");


    


    // GETTING ALL ACCEPTED PRODUCTS OR SEARCHED PRODUCTS FOR ALL PRODUCTS PAGE
    app.get('/all-products', async(req, res)=>{
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const search = req.query.search;
  
        const regex = new RegExp(search, 'i');
          let query = {
            product_name: { $in: [regex] },
          }
  
        console.log('pagination query', req.query);
        const result = await perfumeCollection.find(query).skip(page * size).limit(size).toArray();
        res.send(result);
      })


      // GETTING THE TOTAL NUMBER/COUNT OF ACCEPTED PRODUCTS OR SEARCHED FOR PRODUCTS PAGE PAGINATION
    app.get('/all-products-count', async(req, res)=>{
        const search = req.query.search;
  
        
          const regex = new RegExp(search, 'i');
          let query = {
            product_name: { $in: [regex] },
          }
          console.log('query set', query);
          // const count = await productCollection.countDocuments(query);
      
          
        const count = await perfumeCollection.countDocuments(query);
        console.log("outside if-else", count)
        res.send({count});
      })




    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Scentra server is running');
})

app.listen(port, ()=>{
    console.log(`Scentra server is running on port ${port}`);
})

