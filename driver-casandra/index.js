import { Client } from 'cassandra-driver'

const client = new Client({
  contactPoints: ['localhost'], // Replace with your Cassandra contact points
  localDataCenter: 'datacenter1', // Replace with your Cassandra data center
  keyspace: 'mykeyspace' // Replace with your keyspace name
})

client
  .connect()
  .then(() => {
    console.log('Connected to Cassandra')
    // Your code here
  })
  .catch((error) => {
    console.error('Error conectando a casandra', error)
  })
