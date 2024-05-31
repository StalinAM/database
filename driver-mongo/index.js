import { getConnection } from './mongo.js'

const getData = async () => {
  try {
    const connection = await getConnection()
    const data = await connection.collection('collection').find().toArray()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

getData()
