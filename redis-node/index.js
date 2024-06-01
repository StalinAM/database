import { createClient } from 'redis'
import { readFileSync } from 'fs'

const client = createClient()

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

// Datos uno a uno
await client.set('key', 'value')
const value = await client.get('key')

//Datos desde un archivo
const data = readFileSync('data.json')
const jsonString = data.toString('utf8')
const jsonData = JSON.parse(jsonString)

Object.entries(jsonData).forEach(async ([key, value]) => {
  console.log(key + ' : ' + value)
  await client.set(key, value)
})
console.log(value)
