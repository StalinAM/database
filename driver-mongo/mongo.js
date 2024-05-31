import { MongoClient } from 'mongodb'

const getConnection = async () => {
  try {
    const mongoUrl = 'mongodb://localhost:27017/phonebook'
    const client = await MongoClient.connect(mongoUrl)
    return client.db()
  } catch (error) {
    console.error(error)
  }
}
export { getConnection }
