# COMPSCI 732 / SOFTENG 750 project - Team Careless Crayfish
Team members are:

- Yongbin Yang
- Hongjian Chen
- Xinyuan Zeng
- Joe Zhao
- Yangcheng Zhou
- Mark Zhu

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

# How to start local development

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

# MongoDB

## Login to MongoDB 
1. default username: devroot
1. default password: devroot
1. default database: cs732

## Login to MongoDB Admin Portal

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

# Run automated tests

## frontend
```
cd ./frontend
npm test
```

## backend
```
cd ./backend
npm test
```

Optionally, if you make a commit and push to origin, Github Actions will trigger with the `./github/workflow/ci.yml` workflow which runs all automated tests for frontend and backend.

# Test backend api endpoints

1. spin up backend node server locally by running `npm start` under `./backend`
2. spin up mongodb database docker container by
3. go to http://localhost:3000/api/api-docs
4. view and call apis for testing
