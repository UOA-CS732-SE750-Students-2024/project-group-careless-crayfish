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

> Only available for backend project, which is under `./backend` directory

1. `npm run start:dep`: provision mongodb and wiremock locally
1. `npm start`: start the nodejs server
1. `npm run start:dev`: start the nodejs server in development mode (recommended, and where the AI response comes from wiremock)
1. `npm test`: start unit test
1. `npm run test:e2e`: start e2e test with httpyac
1. `npm run test:dev`: test against local backend with httpyac
1. `npm run build:image`: build a docker image that contains both backend and frontend codes and code dependencies.

## Useful frontend commands

> Only available for frontend project, which is under `./frontend` directory

1. `npm run dev`: start frontend react service(starts vite at `localhost:5173`)
1. `npm test`: start unit test

# How to set up local development environment

## Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

## Provision nodejs

```bash
nvm install 20.11.1
nvm use
```

## Install nodemon globally

```bash
npm install -g nodemon
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

# How to run frontend react, backend node, mongodb in dev mode or as docker containers.

## Run mongodb & wiremock

Run this from Git Bash if you use Windows

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
npm start(starts node server at `localhost:3000`)
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

Run this from Git Bash if you use Windows

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

# How to test the code

## frontend unit tests

1. `cd ./frontend`
2. `npm test`

## backend unit tests

1. `cd ./backend`
2. `npm test`

## backend api integration tests

1. spin up backend node.
2. spin up mongodb database docker container

```
cd ./backend
npm run test:e2e
```

You can also manually test APIs with swagger UI

1. go to http://localhost:3000/api/api-docs
2. view and call apis for testing

## testing AWS CDK infrastructure as code

We currently put dev and prod stacks all in one account but you can test deploying the stack with your own suffix.
You need to reachout to Mark(mzhu929) for giving you permission to access AWS console and deploying stacks as this is his personal AWS account.

```
cd ./infrastructure
npm run deploy-dev
```

Note that `npm run deploy-dev` and `npm run deploy-prod` are actually deploying the same stack at the moment as we could not afford to have multiple stacks.

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

## browser end-to-end tests

### note that we support only `chrome` at this time

### prerequisite

install playwright and chromium

```
npx playwright install --with-deps chromium
```

Ensure you have spinned up react, node servers & mongodb containers locally. If you have not, follow the `How to start local development` guide above.

under project root folder:

1. `cd e2eTests`
2. `npm run test:e2e`

If you raise a pr, Github Actions will trigger with the `./github/workflow/ci.yml` workflow which runs all automated tests

# Deployment

We deploy by using Github Actions to archive source code and ssh into ec2. See `.github/workflows/cd.yml`

Q & A

### 1. sh command not found running `npm run start:dep` for backend

##### A: Please make sure you use Git Bash to run the command if you are on Windows

### 2. For AWS CDK code getting error when running `npm run deploy-dev`

##### A: See `testing AWS CDK infrastructure as code` section for details
