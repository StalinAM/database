# Node y Docker

## Docker

| Comandos                                               | Descripcion                |
| ------------------------------------------------------ | -------------------------- |
| `docker run -d --name mongo-node -p 27017:27017 mongo` | Crear contenedor con mongo |
| `docker exec -it mongo-node mongosh`                   | Ver las claves y valores   |

## Node

| Comandos              | Descripcion              |
| --------------------- | ------------------------ |
| `node init -y`        | Iniciar proyecto de node |
| `npm install mongodb` | Agregar redis a node     |
