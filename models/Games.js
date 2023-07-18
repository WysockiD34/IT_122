import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    dbName: 'it-projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const gameSchema = new Schema({
 title: { type: String, required: true },
 developer: String,
 release: Date,
 genre: String,
});

export const Game = mongoose.model('Game', gameSchema);
