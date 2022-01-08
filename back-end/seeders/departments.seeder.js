import { Seeder } from 'mongoose-data-seed'
import Model from '../models/department'
import departments from './data/departments.json'

let data = []

class DepartmentsSeeder extends Seeder {

  async shouldRun() {
    return await Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    for(let i = 0; i < departments.length; i++){
        data.push({
          name: departments[i].name,
          description: departments[i].description
        })
    }

    return await Model.create(data);
  }
}

export default DepartmentsSeeder;
