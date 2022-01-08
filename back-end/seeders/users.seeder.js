import { Seeder } from 'mongoose-data-seed'
import bcrypt from 'bcrypt'
import Model from '../models/user'
import Department from '../models/department'
import Branch from '../models/branch'
import Role from '../models/role'
import users from './data/users.json'

let data = []



class UsersSeeder extends Seeder {

  async shouldRun() {
    return await Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    let branches = await Branch.find()
    let departments = await Department.find()
    let roles = await Role.find()


    for(let i = 0; i < users.length; i++){
        data.push({
          name: users[i].name,
          username: users[i].username,
          email: users[i].email,
          position: users[i].position,
          password: await bcrypt.hashSync(users[i].password, 10),
          branches: branches[0]._id,
          department: departments[0]._id,
          roles: [(roles.find(x => x.name == "admin")._id), (roles.find(x => x.name == "observer")._id), (roles.find(x => x.name == "standard")._id)]
        })
    }
    return await Model.create(data);
  }
}

export default UsersSeeder;