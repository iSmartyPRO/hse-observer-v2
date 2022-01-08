import { Seeder } from 'mongoose-data-seed'
import Model from '../models/branch'
import branches from './data/branches.json'

let data = []

class BranchesSeeder extends Seeder {

  async shouldRun() {
    return await Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    for(let i = 0; i < branches.length; i++){
        data.push({
          name: branches[i].name,
          location: branches[i].location,
          description: branches[i].description
        })
    }

    return await Model.create(data);
  }
}

export default BranchesSeeder;
