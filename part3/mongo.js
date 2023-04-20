const mongoose = require('mongoose')

if (process.argv.length != 3&&process.argv.length !=5) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://vicekrapperking:${password}@altasmongodb.tdby2dm.mongodb.net/noteData?retryWrites=true&w=majority`
mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Number= mongoose.model('Number', noteSchema)

if (process.argv.length==3){
  console.log("phonebook:")
  result.forEach(note => {
    console.log(note)
  })
}


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy2',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
  process.exit(0)
})