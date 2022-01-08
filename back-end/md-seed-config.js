import mongoose from 'mongoose';
import config from './config'

import Roles from './seeders/roles.seeder'
import Branches from './seeders/branches.seeder'
import Departments from './seeders/departments.seeder'
import Users from './seeders/users.seeder';

const mongoURL = process.env.MONGO_URL || config.MongoDBUri;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Roles,
  Branches,
  Departments,
  Users
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
