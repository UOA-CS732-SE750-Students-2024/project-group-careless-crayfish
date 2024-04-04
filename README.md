# COMPSCI 732 / SOFTENG 750 project - Team Careless Crayfish

Welcome to the project! I look forward to seeing your progress and your final results this semester!

Your team members are:

- Yongbin Yang
- Hongjian Chen
- Xinyuan Zeng
- Joe Zhao
- Yangcheng Zhou
- Mark Zhu

<img src="./group-image/Careless%20Crayfish.webp" alt="Careless Crayfish" width="100px" height="100px">

# How to set up development environment locally (linux/Mac)

## Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

## Provision nodejs

```bash
nvm install 20.11.1
nvm use
```

## setup frontend

1. `cd ./frontend`
2. `npm install`

## setup backend

1. `cd ./backend`
2. `npm install`

## run frontend

1. `cd ./frontend`
2. `npm run dev`

## run backend

1. `cd ./backend`
2. `npm start`

# Install Docker

please google `Docker Desktop install`

## Set up and run mongodb with docker-compose locally.

You must install Docker Desktop before running the following command

```bash
docker-compose up -d
```

## MongoDB

1. default username: devroot
1. default password: devroot
1. default database: cs732

## MongoDB Admin Portal

http://localhost:8080/

username: `dev`, password:`dev`

# How to build and run docker image locally

Run the following command under the root directory

```
sh scripts/build.sh
```

A docker image `cs732-careless-crayfish` will be created locally

## Run the image

```
docker run -p 8001:3000 -p 8000:5000 -d cs732-careless-crayfish
```

### Verify the instance of the image is up and running

1. Visit the backend: http://localhost:8001/api/users
1. Visit the frontend: http://localhost:8000/

# How to run automated tests

## frontend

1. `cd ./frontend`
2. `npm test`

## backend

1. `cd ./backend`
2. `npm test`

## optionally, if you make a commit and push to origin, Github Actions will trigger with the `./github/workflow/ci.yml` workflow which runs all automated tests for frontend and backend.

# Swagger UI API documentation

1. spin up backend node server locally
2. go to http://localhost:3000/api/api-docs
3. view and trigger apis for testing
