import { Seeder } from 'mongoose-data-seed'
import Model from '../models/role'
import roles from './data/roles.json'

let data = []



class RolesSeeder extends Seeder {

  async shouldRun() {
    return await Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    for(let i = 0; i < roles.length; i++){
        data.push({
          name: roles[i].name,
          displayName: roles[i].displayName,
          description: roles[i].description
        })
    }

    return await Model.create(data);
  }
}

export default RolesSeeder;
