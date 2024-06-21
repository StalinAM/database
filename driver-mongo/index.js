import { getConnection } from './mongo.js'
import fs from 'node:fs'

const data = JSON.parse(
  fs.readFileSync('personajes_marvel_subir.json', 'utf-8')
)
const insertData = async () => {
  try {
    const connection = await getConnection()
    const result = await connection
      .collection('marvel')
      .insertMany(data.results)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

insertData()
