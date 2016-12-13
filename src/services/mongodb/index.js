import mongoose, { Schema } from 'mongoose';

const connection = mongoose.connect('mongodb://localhost/compendium');

/**
 * Users
 */
const UserModelSchema = new Schema({
  username: String,
  password: String
}, {
  versionKey: false
});

export const UserModel = connection.model('User', UserModelSchema);

/**
 * Medicines
 */
const MedicineModelSchema = new Schema({
  name: String,
  interactions: {
    medicines: [String],
    contraindications: [String]
  }
}, { 
  versionKey: false 
});

export const MedicineModel = connection.model('Medicine', MedicineModelSchema);

/**
 * Contraindications
 */
const ContraindicationModelSchema = new Schema({
  name: String,
  icon: String
}, {
  versionKey: false
});

export const ContraindicationModel = connection.model('Contraindication', ContraindicationModelSchema);

export default connection;