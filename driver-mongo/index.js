import { getConnection } from './mongo.js'
import fs from 'node:fs'

const getData = async () => {
  try {
    const connection = await getConnection()
    const data = await connection.collection('collection').find().toArray()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

const data = JSON.parse(
  fs.readFileSync('personajes_marvel_subir.json', 'utf-8')
)
// console.log(data.results)
const insertData = async () => {
  try {
    const connection = await getConnection()
    const result = await connection
      .collection('collection')
      .insertMany(data.results)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

insertData()
