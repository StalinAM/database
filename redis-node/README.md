# Node y Docker

## Docker

| Comandos                                             | Descripcion                |
| ---------------------------------------------------- | -------------------------- |
| `docker run -d --name node-redis -p 6379:6379 redis` | Crear contenedor con redis |
| `docker exec -it redis-node redis-cli`               | Ver las claves y valores   |

## Node

| Comandos            | Descripcion              |
| ------------------- | ------------------------ |
| `node init -y`      | Iniciar proyecto de node |
| `npm install redis` | Agregar redis a node     |
