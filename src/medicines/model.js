// @flow

import { Schema } from 'mongoose';
import mongoose from '../services/mongodb';

export type Medicine = {
  id: string,
  name: string,
  interactions: Interactions
};

export type Interactions = {
  medicines: string[],
  contraindications: string[]
}

const MedicineModelSchema = new Schema({
  name: String,
  interactions: {
    medicines: [String],
    contraindications: [String]
  }
}, { 
  versionKey: false 
});

const MedicineModel = mongoose.model('Medicine', MedicineModelSchema);

/**
 * Return all medicines from database
 */
export async function getAll(): Promise<Medicine[]> {

  const result = await MedicineModel.find().exec();

  return result.map(_modelToMedicine);
}

/**
 * Return one medicine from database, which has _id equal to passed param `id`
 */
export async function getById(id: string): Promise<Medicine | null> {

  const result = await MedicineModel.findOne({ _id: id }).exec();

  if(!result) return null;

  return _modelToMedicine(result);
}

/**
 * Save new medicine to database
 */
export async function add({ name, interactions }: { name: string, interactions: Interactions }): Promise<Medicine> {

  const medicinesInteraction = await _getValidMedicinesIds(interactions.medicines);
  
  const newMedicineValues = {
    name,
    interactions: {
      medicines: medicinesInteraction,
      contraindications: interactions.contraindications
    }
  };
  const newMedicine = new MedicineModel(newMedicineValues);
  const result = _modelToMedicine(await newMedicine.save());

  _addMedicinesInteraction(medicinesInteraction, result.id);

  return result;
}

/**
 * Remove medicine from database , which has _id equal to passed param `id`
 */
export async function removeById(id: string){

  const medicine = await MedicineModel.findById(id);

  _removeMedicinesInteraction(medicine.interactions.medicines, medicine.id);

  return await medicine.remove();
}

/**
 * Update medicine, which has _id equal to passed param `id`
 */
export async function updateById(id: string, { name, interactions }: { name: string, interactions: Interactions }): Promise<Medicine> {

  const medicine = await MedicineModel.findById(id);

  const medicinesInteractions = await _getValidMedicinesIds(interactions.medicines);

  const addedMedicinesInteractions = _subtractArrays(medicinesInteractions, medicine.interactions.medicines);
  _addMedicinesInteraction(addedMedicinesInteractions, id);

  const removedMedicinesInteractions = _subtractArrays(medicine.interactions.medicines, medicinesInteractions);
  _removeMedicinesInteraction(removedMedicinesInteractions, id);

  medicine.name = name;
  medicine.interactions = {
    medicines: medicinesInteractions,
    contraindications: interactions.contraindications
  };
  const result = await medicine.save();

  return _modelToMedicine(result);
}

/**
 * Add medicine interaction `medicineInteractionId` to medicines which ids include in `medicinesIds`
 */
function _addMedicinesInteraction(medicinesIds: string[] = [], medicineInteractionId: string): void {

  medicinesIds.forEach((id) => {
    MedicineModel.findById(id, (err, medicine) => {
      if(err) return;
      medicine.interactions.medicines = _insertUniqueValue(medicine.interactions.medicines, medicineInteractionId);
      medicine.save();
    });
  });
}

/**
 * Remove medicine interaction `medicineInteractionId` from medicines which ids include in `medicinesIds`
 */
function _removeMedicinesInteraction(medicinesIds: string[] = [], medicineInteractionId: string): void {

  medicinesIds.forEach((id) => {
    MedicineModel.findById(id, (err, medicine) => {
      if(err) return;
      medicine.interactions.medicines = _removeValue(medicine.interactions.medicines, medicineInteractionId);
      medicine.save();
    });
  });
}

/**
 * Return array of only valid medicines ids passed as `medicinesIds`, which are present in database
 */
async function _getValidMedicinesIds(medicinesIds: string[]): Promise<string[]> {

  const allMedicines = await MedicineModel.find();
  const allMedicinesIds = allMedicines.map(({ id }) => id);
  
  const result = medicinesIds.filter((id) => allMedicinesIds.includes(id));

  return result;
}

/**
 * Insert unique value to array, values won't be duplicated
 * Return array with inserted value
 */
function _insertUniqueValue(array: any[], value: any){

  if(array.includes(value)) return array;

  return [...array, value];
}

/**
 * Remove passed value from array
 * Return array with removed value
 */
function _removeValue(array: any[], value: any){

  return array.filter((x) => x !== value);
}

/**
 * Subtract two arrays
 * return = minuend - subtrahend
 */
function _subtractArrays(minuend: string[] = [], subtrahend: string[] = []): string[] {

  return minuend.filter((value) => !subtrahend.includes(value));
}

/**
 * Return proper medicine object created from raw medicine model
 */
function _modelToMedicine({ _id, name, interactions }: { _id: string, name: string, interactions: Interactions }): Medicine {
  
  return {
    name,
    interactions,
    id: _id
  };
}