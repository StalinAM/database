# Node y Docker

## Docker

| Comandos                                                   | Descripcion                   |
| ---------------------------------------------------------- | ----------------------------- |
| `docker run -d --name casandra-node -p 9042:9042 casandra` | Crear contenedor con casandra |
| `docker exec -it casandra-node bash`                       | Ver las claves y valores      |

## Node

| Comandos                       | Descripcion              |
| ------------------------------ | ------------------------ |
| `node init -y`                 | Iniciar proyecto de node |
| `npm install cassandra-driver` | Agregar redis a node     |
