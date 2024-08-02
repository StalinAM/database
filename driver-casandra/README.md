# Node y Docker

## Docker

- Cluster con replicacion.

```sh
docker volume create --name=cassandra_seed_data
```

```bash
docker volume create --name=cassandra_node1_data
```

```bash
docker run -d --name cass_sedd -v cassandra_seed_data:/var/lib/cassandra -p 9042:9042 -p 7000:7000 -p 7001:7001 cassandra
```

```bash
docker run -d --name cass_1 -v cassandra_node1_data:/var/lib/cassandra -e CASSANDRA_SEEDS="$(docker inpect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cass_seed)" cassandra
```

- Inspeccionar puerto docker

`docker inspect cass_seed`
IPAddress: ipdel servicio en docker

`docker run -d --name cass1 -e CASSANDRA_SEEDS=IPAddress cassandra`
`docker exec -it cass1 bash`

- Entrar terminal cassandra
  `cqlsh`

- Entrar al keyspace
  `use ks_cancionero;`
- crear e insertar datos
- consultas
  `select * from nombre_tabla`
- mostrar la base desde otro nodo
  `desc keyspace`

- Ver los nodos conectados en rack
  `nodetool status`
- ver el nodo semilla
  `nodetool getseeds`

- ver donde se encunetra replicado el dato
  `nodetool getendpoints nombre_keyspace nombre_tabla nombre_pk`

`docker run -d --name cass1`

## Keyspace

```sql
CREATE KEYSPACE ks_cancionero
WITH REPLICATION = {
'class' : 'SimpleStrategy', 'replication_factor' : 2};
```

## Crear tabla

```sql
create table artista_por_album (

	nombre_album text,

	genero_album text,

	nombre_artista text,

	anio_album int,

	sexo_artista boolean,

	PRIMARY KEY (nombre_artista, anio_album, nombre_album));
```

## Insertar datos

```sql
insert into artista_por_album

(nombre_album,genero_album,nombre_artista,

anio_album,sexo_artista)

values('JAlbum', 'Salsa', 'Joji', 2024, true);

insert into artista_por_album

(nombre_album,genero_album,nombre_artista,

anio_album,sexo_artista)

values('Album1', 'Salsa', 'Joji', 2000, true);

insert into artista_por_album

(nombre_album,genero_album,nombre_artista,

anio_album,sexo_artista)

values('Album1', 'Salsa', 'Joji', 2014, true);
```

## Node

| Comandos                       | Descripcion              |
| ------------------------------ | ------------------------ |
| `node init -y`                 | Iniciar proyecto de node |
| `npm install cassandra-driver` | Agregar redis a node     |
