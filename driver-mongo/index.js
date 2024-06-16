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

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
// console.log(data)
const insertData = async () => {
  try {
    const connection = await getConnection()
    const result = await connection.collection('collection').insertMany(data)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

getData()
// insertData()
