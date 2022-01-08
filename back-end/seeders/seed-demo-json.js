// Подключение необходимых библиотек
const config = require("../config")
const bcrypt = require("bcrypt")
const MongoClient = require("mongodb").MongoClient


// Первоначальные данные из JSON файлов
const branches_data = require('./data/branches-test.json')
const departments_data = require('./data/departments-test.json')
const users_data = require('./data/users-test.json')

// Строка подключения URL
const uri = process.env.MONGO_URL || config.MongoDBUri
const dbname_regex = new RegExp('([^/]+)(?=[^/]*/?$)', 'gi')
const dbname = uri.match(dbname_regex)[0]


function getIds(data, search) {
  return data.filter(value => search.includes(value.name)).map(item => { return item._id })
}

async function seedDB(seedData) {
  const client = new MongoClient(uri, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log("\x1b[0m", "===============================")
    console.log("\x1b[32m", "Успешно подключен к базе данных")
    console.log("\x1b[0m", "===============================")

    for (let i = 0; i < seedData.length; i++) {
      let collection = await client.db(dbname).collection(seedData[i].collection)
      await collection.insertMany(seedData[i].data)
      console.log("\x1b[33m", `${seedData[i].collection} добавлены данные в коллекцию`)
      // console.log("\x1b[0m", await collection.find({}).toArray()) // отображение импортированных данных
    }
  } catch (err) {
    console.log("\x1b[31m", 'Возникла ошибка в процессе импорта данных')
    console.log(err.stack)
  }
  client.close()

}


async function seedUser() {
  const client = new MongoClient(uri, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log("\x1b[0m", "===============================")
    console.log("\x1b[32m", "Успешно подключен к базе данных")
    console.log("\x1b[0m", "===============================")
    const branches = await client.db(dbname).collection('branches').find({}).toArray()
    const departments = await client.db(dbname).collection('departments').find({}).toArray()
    const roles = await client.db(dbname).collection('roles').find({}).toArray()
    const users = await client.db(dbname).collection('users')
    // формируем объект для импорта
    let new_users = []
    for (let i = 0; i < users_data.length; i++) {
      new_users.push({
        "name": users_data[i].name,
        "username": users_data[i].username,
        "password": bcrypt.hashSync(users_data[i].password, 10),
        "email": users_data[i].email,
        "position": users_data[i].position,
        "authType": users_data[i].authType,
        "language": users_data[i].language,
        "roles": getIds(roles, users_data[i].roles),
        "department": departments.find(item => item.name === 'Разработчики')._id,
        "branches": getIds(branches, users_data[i].branches)
      })
    }
    // выполняем импорт
    await users.insertMany(new_users)
    console.log("\x1b[33m", `users добавлены данные в коллекцию`)
    client.close()
  } catch (err) {
    console.log('Error occurs during seeding data')
    console.log(err.stack)
  }
}






async function seedStart() {
  // Формируем массив объектов для seed данных
  // нижеуказанные данные, не связаны между собой
  let seedData = [
    {
      "collection": "branches",
      "data": branches_data
    },
    {
      "collection": "departments",
      "data": departments_data
    }
  ]
  await seedDB(seedData)

  // нижеуказанные данные, связаны c ранее созданными данными
  await seedUser()

  console.log("\x1b[0m", "=====================================")
  console.log("\x1b[32m", "Импорт демо данных из JSON файлов завершен")
  console.log("\x1b[0m", "=====================================")
}

seedStart()