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

## setup frontend react project

1. `cd ./frontend`
2. `npm install`

## setup backend node project

1. `cd ./backend`
2. `npm install`

## Install Docker Desktop(windows)

install docker desktop: https://docs.docker.com/desktop/install/windows-install/#:~:text=Download%20the%20installer%20using%20the,Program%20Files%5CDocker%5CDocker%20.

# How to start local development

## run frontend react

1. `cd ./frontend`
2. `npm run dev`

## run backend node

1. `cd ./backend`
2. `npm start`

## run mongodb containers through docker-compose

under `./script` folder, run

```bash
./start.sh
```

# MongoDB configs

1. default username: devroot
1. default password: devroot
1. default database: cs732

## MongoDB Admin Portal

http://localhost:8080/db/admin/

username: `dev`, password:`dev`

# Code deployment

Run the following command under the root directory which builds a docker image `cs732-careless-crayfish` for react, node & mongodb

```
sh scripts/build.sh
```

## Run the image

```
docker run -p 8001:3000 -p 8000:5000 -d cs732-careless-crayfish
```

### Verify the instance of the image is up and running

1. Visit the backend: http://localhost:8001/api/users
2. Visit the frontend: http://localhost:8000/
3. Visit mongodb admin portal: http://localhost:8080 with username: dev, password: dev

# How to run automated tests

## frontend

1. `cd ./frontend`
2. `npm test`

## backend

1. `cd ./backend`
2. `npm test`

## optionally, if you make a commit and push to origin, Github Actions will trigger with the `./github/workflow/ci.yml` workflow which runs all automated tests for frontend and backend.

# How to test your node apis

1. spin up backend node server locally by running `npm start` under `./backend`
2. spin up mongodb database docker container by
3. go to http://localhost:3000/api/api-docs
4. view and call apis for testing
