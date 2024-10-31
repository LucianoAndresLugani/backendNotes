
const mongoose = require('mongoose');
const uri = "mongodb+srv://luciano:1816@cluster0.4mjsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    mongoose.set('strictQuery',false)
    const noteSchema = new mongoose.Schema({
        content: String,
        important: Boolean,
      })
      
      const Note = mongoose.model('Note', noteSchema)
      
      const note = new Note({
        content: 'HTML is x',
        important: true,
      })
      
      /*
      note.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
      })
      */
      Note.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
    })
  
} finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
