# saudify-api

[![Build Status](https://travis-ci.org/Saudify/saudify-api.svg?branch=master)](https://travis-ci.org/Saudify/saudify-api)

## Usage

### Requirements

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running server

1. **Build the base images:**
  ```sh
  $ sudo docker-compose build
  ```

2. **Start server**
  ```sh
  $ sudo docker-compose up
  ```

### Running tests

**Run all tests**
```sh
$ sudo docker-compose run saudify-api npm test
```
