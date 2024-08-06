# Node y Docker

## Docker

### Cluster con replicacion.

#### Creacion volumenes

```bash
docker volume create --name=vol1
```

```bash
docker volume create --name=vol2
```

```bash
docker run -d --name node_seed -v vol1:/etc/cassandra -e CASSANDRA_DC=QUITO -e CASSANDRA_RACK=rack1 -p 9042:9042 -p 7000:7000 -p 7001:7001 cassandra
```

```bash
docker run -d --name node1 -v vol2:/etc/cassandra -e CASSANDRA_DC=GUAYAQUIL -e CASSANDRA_RACK=rack2 -e CASSANDRA_SEEDS="$(docker inpect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' node_seed)" cassandra
```

#### Modificar datacenter y rack.

Ingresar a la ruta `\\wsl.localhost\docker-desktop-data\data\docker\volumes\vol1\_data` editar los archivos:

- `cassandra-rackdc` los parametros `dc` y`rack`
- `cassandra` cambiar `endpoint_snitch: GossipingPropertyFileSnitch`
- `cassandra-env.sh` comendar la ultima linea y agregar al final `JVM_OPTS="$JVM_OPTS -Dcassandra.ignore_dc=true -Dcassandra.ignore_rack=true"`

Reiniciar los contenedores.

### Crear KEYSPACE

- Solo sin modificar datacenter

```sql
CREATE KEYSPACE ks_cancioenro
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };
```

- Solo con distintos datacenter

```sql
CREATE KEYSPACE ks_cancionero
    WITH REPLICATION = {'class':'NetworkTopologyStrategy', 'GUAYAQUIL' : 1, 'CUENCA' : 1};
```

### Comandos

- Inspeccionar puerto docker

`docker inspect cass_seed`
IPAddress: ipdel servicio en docker

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
