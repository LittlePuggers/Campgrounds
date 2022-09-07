import mongoose from 'mongoose';

const Schema = mongoose.Schema

const personSchema = new Schema({
    name: 'string',
    lastName: 'string',
    age: 'number',
})

const Person = new mongoose.model('Person', personSchema);

export default Person;