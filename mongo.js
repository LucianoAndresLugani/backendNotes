const mongoose = require('mongoose')

// Si tienes problemas con el puerto o el usuario, revisa bien la URI de conexión

const url='mongodb+srv://luciano:1816@cluster0.4mjsf.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// eslint-disable-next-line no-unused-vars
const note = new Note({
  content: 'Mongoose makes things easy',
  date: new Date(),
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