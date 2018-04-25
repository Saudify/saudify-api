# saudify-api (work in progress)

[![Build Status](https://travis-ci.org/Saudify/saudify-api.svg?branch=master)](https://travis-ci.org/Saudify/saudify-api)

## Usage

### Requirements

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running server

- **Build image:**
```sh
$ sudo docker-compose build saudify-api

# or using make

$ sudo make build-api
```

- **Import static data on development** (Optional)
```sh
$ sudo docker-compose run saudify-api npm run import:dev

# or using make

$ sudo make import-static-contrib
```

- **Start API**
```sh
$ sudo docker-compose up saudify-api

# or using make

$ sudo make run-api
```

### Tests

- **Build image**
```sh
$ sudo docker-compose build test

# or using make

$ sudo make build-test
```

- **Run all tests**
```sh
$ sudo docker-compose run test

# or using make

$ sudo make test
```

### Stopping and clear all containers

```sh
$ sudo docker-compose down -v --rmi local

# or using make

$ sudo make teardown
```
