import { Client } from 'cassandra-driver'
import xlsx from 'xlsx'

const client = new Client({
  contactPoints: ['localhost'], // Replace with your Cassandra contact points
  localDataCenter: '  ', // Replace with your Cassandra data center
  keyspace: 'mykeyspace' // Replace with your keyspace name
})

/// Ruta al archivo Excel
const filePath = './results.xlsx'

// Leer el archivo Excel
const workbook = xlsx.readFile(filePath)
const sheetName = workbook.SheetNames[0]
const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
  header: 1
})

// Obtener la primera fila como nombres de columnas
const columnNames = sheet[0]

// Función para inferir el tipo de dato de una columna
const inferType = (values) => {
  let typeCounts = { int: 0, double: 0, boolean: 0, timestamp: 0, text: 0 }

  values.forEach((value) => {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        typeCounts.int++
      } else {
        typeCounts.double++
      }
    } else if (typeof value === 'boolean') {
      typeCounts.boolean++
    } else if (!isNaN(Date.parse(value))) {
      typeCounts.timestamp++
    } else if (typeof value === 'string') {
      typeCounts.text++
    }
  })

  let inferredType = 'text'
  let maxCount = 0

  for (let [type, count] of Object.entries(typeCounts)) {
    if (count > maxCount) {
      maxCount = count
      inferredType = type
    }
  }

  return inferredType
}

// Inferir tipos de datos para cada columna
const columnTypes = columnNames.map((name, index) => {
  const values = sheet.slice(1).map((row) => row[index])
  return inferType(values)
})

// Crear una tabla en Cassandra con tipos de datos inferidos
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY,
    ${columnNames
      .map(
        (name, index) =>
          `${name.toLowerCase().replace(/ /g, '_')} ${columnTypes[index]}`
      )
      .join(', ')}
  )
`
console.log(createTableQuery)
// Continue with your code
// client
//   .connect()
//   .then(() => {
//     console.log('Connected to Cassandra')
//     // Your code here
//   })
//   .catch((error) => {
//     console.error('Error connecting to Cassandra', error)
//   })
