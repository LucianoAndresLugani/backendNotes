const mongoose = require('mongoose');

// Si tienes problemas con el puerto o el usuario, revisa bien la URI de conexión
const uri = "mongodb+srv://luciano:1816@cluster0.4mjsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set('strictQuery', false);

// Definir el esquema y el modelo en la parte superior para evitar duplicidad
const noteSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

async function run() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(uri, { serverApi: { version: '1', strict: true, deprecationErrors: true } });
    console.log("Conectado a MongoDB correctamente.");

    // Guardar una nueva nota (descomentar si deseas guardarla)
    /*
    const note = new Note({
      content: 'Mongoose makes things easy',
      important: true,
    });

    await note.save();
    console.log('Nota guardada:', note);
    */

    // Encontrar y mostrar todas las notas
    const notes = await Note.find({});
    notes.forEach(note => console.log(note));

  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log("Conexión cerrada.");
  }
}

// Ejecutar la función
run().catch(console.dir);
