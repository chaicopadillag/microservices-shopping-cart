<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

# Microservices Shopping Cart with NestJS and MongoDB

## Requirements

- NodeJS v16.16.x
- TypeScript v4.7.x
- NestJS v9.x
- MongoDB v5.x
- npm OR yarn latest version
- Docker v20.10.x (optional)
- Docker Compose v2.9.x (optional)

## Cloning the repository

```bash
$ git clone git@github.com:chaicopadillag/microservices-shopping-cart.git
```

## Installation with Docker

check the file `docker-compose.yml` and update the values and run the following command:

```bash
$ docker-compose up -d
```

Copy `.env.example` to `.env` and update the values

```bash
$ cp .env.example .env
```

## Intallation local

```bash
$ npm install
# or
$ yarn install
```

## Running the apps microservices

```bash
# user-app running port: 6000 default
$ yarn dev:user
# product-app running port: 3000 default
$ yarn dev:product
# shopping-cart-app running port: 5000 default
$ yarn dev:cart
# purchase-order-app running port: 4000 default
$ yarn dev:order

```

## Sending seeders using `curl` or `Postman`

```bash
# user seeders
$ curl --location --request POST 'http://localhost:6000/api/user-seed'
```

```bash
# product seeders
$ curl --location --request POST 'http://localhost:3000/api/product-seed'
```

## Documentation API

review the [API documentation here](https://documenter.getpostman.com/view/11896801/VUqpsck7) ✅

## Test

```bash
# unit tests
$ yarn test
```
