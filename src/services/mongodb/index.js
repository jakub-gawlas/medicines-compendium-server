import mongoose from 'mongoose';

const connection = mongoose.connect('mongodb://localhost/compendium');

export default connection;