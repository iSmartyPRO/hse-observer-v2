const fs = require('fs')
const path = require('path')




module.exports.checkIds = (checkData) => {
  let { collectionName, ids } = checkData
  return new Promise(async (resolve, reject) => {
    const result = {}
    if (!collectionName || !typeof (collectionName) === 'string') result.errors.push('Collection name is not String')
    if (!ids || !(ids instanceof Array)) result.errors.push('ids is not Array')
    if (collectionName === 'User') {
      User.find({ "_id": ids })
        .then(response => {
          let dbIds = response.map(item => { return item._id.toString() })
          let missingIds = ids.filter(item => !dbIds.includes(item))
          missingIds.length === 0 ?
            resolve(Object.assign(result, { ok: true })) :
            reject(Object.assign(result, { ok: false, collectionName, message: 'Missing IDs', missingIds }))
        })
        .catch(err => console.log(err))
    }
    if (collectionName === 'Branch') {
      Branch.find({ "_id": ids })
        .then(response => {
          let dbIds = response.map(item => { return item._id.toString() })
          let missingIds = ids.filter(item => !dbIds.includes(item))
          missingIds.length === 0 ?
            resolve(Object.assign(result, { ok: true })) :
            reject(Object.assign(result, { ok: false, collectionName, message: 'Missing IDs', missingIds }))
        })
        .catch(err => console.log(err))
    }
    if (collectionName === 'Department') {
      Department.find({ "_id": ids })
        .then(response => {
          let dbIds = response.map(item => { return item._id.toString() })
          let missingIds = ids.filter(item => !dbIds.includes(item))
          missingIds.length === 0 ?
            resolve(Object.assign(result, { ok: true })) :
            reject(Object.assign(result, { ok: false, collectionName, message: 'Missing IDs', missingIds }))
        })
        .catch(err => console.log(err))
    }
    if (collectionName === 'Role') {
      Role.find({ "_id": ids })
        .then(response => {
          let dbIds = response.map(item => { return item._id.toString() })
          let missingIds = ids.filter(item => !dbIds.includes(item))
          missingIds.length === 0 ?
            resolve(Object.assign(result, { ok: true })) :
            reject(Object.assign(result, { ok: false, collectionName, message: 'Missing IDs', missingIds }))
        })
        .catch(err => console.log(err))
    }
    if (collectionName === 'Observer') {
      Observer.find({ "_id": ids })
        .then(response => {
          let dbIds = response.map(item => { return item._id.toString() })
          let missingIds = ids.filter(item => !dbIds.includes(item))
          missingIds.length === 0 ?
            resolve(Object.assign(result, { ok: true })) :
            reject(Object.assign(result, { ok: false, collectionName, message: 'Missing IDs', missingIds }))
        })
        .catch(err => console.log(err))
    }
  })
}


module.exports.checkIds2 = (checkData) => {
  var appDir = path.dirname(require.main.filename);
  let { modelFile, ids } = checkData
  return new Promise(async (resolve, reject) => {
    const result = {errors: []}
    try {
      if(fs.existsSync(path.join(appDir, 'models', `${modelFile}.js`))) {
        const Model = require(path.join(appDir, 'models', `${modelFile}.js`))
        if (!ids || !(ids instanceof Array)) result.errors.push('ids is not Array')
        Model.find({ "_id": ids })
          .then(response => {
            let dbIds = response.map(item => { return item._id.toString() })
            let missingIds = ids.filter(item => !dbIds.includes(item))
            missingIds.length === 0 ?
              resolve(Object.assign(result, { ok: true })) :
              reject(Object.assign(result, { ok: false, modelFile, message: 'Missing IDs', missingIds }))
          })
          .catch(err => console.log(err))
      } else {
        result.errors.push(`Model file: '${modelFile}' not found`)
        reject(Object.assign(result, { ok: false }))
      }
    } catch(err) {
      console.log(err)
      result.errors.push('Model file not exist')
      reject(Object.assign(result, { ok: false }))
    }
    }
  )
}

