import { MongoClient } from 'mongodb'

const getConnection = async () => {
  try {
    const mongoUrl =
      'mongodb+srv://<user>:<password>@cluster0.ldhoocb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    const client = await MongoClient.connect(mongoUrl)
    return client.db('prueba')
  } catch (error) {
    console.error(error)
  }
}
export { getConnection }
