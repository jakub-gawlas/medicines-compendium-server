import mongoose, { Schema } from 'mongoose';

const connection = mongoose.connect('mongodb://localhost/compendium');

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