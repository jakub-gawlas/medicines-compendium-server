// @flow

import { ContraindicationModel, MedicineModel } from '../services/mongodb';

export type Contraindication = {
  id: string,
  name: string,
  icon: string
};

/**
 * Return all contraindications from database
 */
export async function getAll(): Promise<Contraindication[]> {

  const result = await ContraindicationModel.find();

  return result.map(_modelToContraindication);
}

/**
 * Save new contraindication to database
 */
export async function add({ name, icon }: { name: string, icon: string}): Promise<Contraindication> {

  const newContraindication = new ContraindicationModel({ name, icon });
  const result = await newContraindication.save();

  return _modelToContraindication(result);
}

/**
 * Remove contraindication from database, which has _id equal to passed param `id`
 */
export async function removeById(id: string): Promise<Contraindication> {

  const contraindication = await ContraindicationModel.findById(id);

  if(!contraindication) throw Error('Contraindication not exists.');

  _removeContraindicationsInteraction(id);

  return await contraindication.remove();
}

/**
 * Remove contrainidcation interaction from medicines
 */
function _removeContraindicationsInteraction(contraindicationId: string): void {

  MedicineModel.update(
    {}, 
    { $pull: { 'interactions.contraindications': contraindicationId } },
    { multi: true }
  );
}

/**
 * Return proper medicine object created from raw medicine model
 */
function _modelToContraindication({ _id, name, icon }: { _id: string, name: string, icon: string }): Contraindication {
  
  return {
    name,
    icon,
    id: _id
  };
}