import mongoose from 'mongoose';
import config from './config'

import Branches from './seeders/branches.seeder'
import Departments from './seeders/departments.seeder';
import Users from './seeders/users.seeder';
import Roles from './seeders/roles.seeder'

const mongoURL = process.env.MONGO_URL || config.MongoDBUri;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Branches,
  Departments,
  Users,
  Roles
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
