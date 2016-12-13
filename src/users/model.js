// @flow

import { UserModel } from '../services/mongodb';

export type User = {
  id: string,
  username: string,
  password: string
};

/**
 * Return one user from database, which username equal to passed param 
 */
export async function getByUsername(username: string): Promise<User | null> {

  const result = await UserModel.findOne({ username });

  if(!result) return null;

  return result;
}