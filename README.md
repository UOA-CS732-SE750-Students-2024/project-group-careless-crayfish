# COMPSCI 732 / SOFTENG 750 project - Team Careless Crayfish
Team members are:

- Yongbin Yang
- Hongjian Chen
- Xinyuan Zeng
- Joe Zhao
- Yangcheng Zhou
- Mark Zhu

# Useful commands
## Useful backend commands
>
> Only available for backend project, which is under `./backend` directory

1. `npm run start:dep`: provision mongodb and wiremock locally
1. `npm start`: start the nodejs server
1. `npm test`: start unit test
1. `npm run test:e2e`: start e2e test with httpyac
1. `npm run test:dev`: test against local backend with httpyac
1. `npm run build:image`: build a docker image that contains both backend and frontend codes and code dependencies.

## Useful frontend commands
>
> Only available for frontend project, which is under `./frontend` directory

1. `npm run dev`: start frontend react service
1. `npm test`: start unit test

# Set up development environment locally

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

```
cd ./frontend
npm install
```

## setup backend node project
```
cd ./backend
npm install
```

## Install Docker Desktop

### Windows
follow the instruction [HERE](https://docs.docker.com/desktop/install/windows-install/#:~:text=Download%20the%20installer%20using%20the,Program%20Files%5CDocker%5CDocker%20)

### Mac
```
brew install docker
```

# local development

## Provision development environment (mongodb, wiremock)
```
# In a new shell, and keep this shell opened

cd ./backend
npm run start:dep

#verify the env
Open http://localhost:8080/db/admin/ in your browswer, and login with dev/dev
```

## Run frontend react
```
cd ./frontend
npm run dev
```

## Run backend node
```
cd ./backend
npm start
```

## Test backend api endpoints

**Prerequisite**: backend is up and running
```
cd ./backend
npm run test:e2e
```

## Run unit tests

### frontend
```
cd ./frontend
npm test
```

### backend
```
cd ./backend
npm test
```

Optionally, if you make a commit and push to origin, Github Actions will trigger with the `./github/workflow/ci.yml` workflow which runs all automated tests for frontend and backend.

## Swagger endpoint
http://localhost:3000/api/api-docs

## Github Action local development
Official Doc: https://github.com/nektos/act
### install dependency (Mac)
```
brew install arc
```

## httpyac test example
Follow the instruction from https://httpyac.github.io/guide/examples.html

## wiremock 
Put your mock files under `deployment/wiremock/__files` and `deployment/wiremock/mappings`

Refere the `json` example here: https://wiremock.org/docs/stubbing/

### Simulate github action locally
```
act # run all github actions
act -j build-test-backend # run a specific github action
```

# MongoDB

## Login to MongoDB 
1. default username: devroot
1. default password: devroot
1. default database: cs732

## Login to MongoDB Admin Portal

http://localhost:8080/db/admin/

username: `dev`, password:`dev`

# Build Docker Image

## Build the image
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

