# COMPSCI 732 / SOFTENG 750 Project - Team Careless Crayfish

---

# **FindMe**

> A web application designed to simplify the process of organizing social gatherings after work or school.

## Overview

**FindMe** is an innovative application designed to streamline the organization of social gatherings, focusing on enhancing social experiences with friends and colleagues. This solution integrates venue recommendations and voting mechanisms within a single, user-friendly interface.

### Purpose

The application simplifies the process of deciding where to go for meals or social outings after work or school. By combining location-based services and social features, it offers a seamless experience that facilitates social interactions and efficient planning.

### Development Focus

Our project is developed for both mobile and web platforms but mainly focusing on web, targeting users who seek a convenient way to organize gatherings. It features:

- **Location-Based Recommendations:** Suggests venues based on the user's current location and preferences.
- **Voting System:** Allows groups to vote on preferred venues, democratizing the decision-making process.
- **User-Friendly Interface:** Ensures a cohesive and intuitive user experience across all devices.

---

# Features Overview

Below is a detailed table categorizing the essential and additional features of our web application designed to streamline organizing social gatherings after work or school. Each feature is listed along with a detailed description.

## Feature Details

| Feature                          | Description                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                  |                                                                                                                                                                                                                                        |
| **Recommendations**              | Utilize GPS to determine user location; allow users to select party type (e.g., food, club, sports, exhibition) and input details like cuisine type, age range, and expected time; recommend appropriate venues based on these inputs. |
| **Votes**                        | Enable voting on recommended locations; set a deadline for votes; count votes to select the final gathering place; display voting results for clarity.                                                                                 |
| **Support Sign-up & Login**      | Enable login via third-party accounts such as Google or Microsoft for ease.                                                                                                                                                            |
| **Keep User Status**             | Allow users to resume previous activities upon re-login and retain state and activity history like voting records and preferences.                                                                                                     |
| **Search Bar for History Votes** | Permit users to search and review past voting records and activity histories, refining searches by date and location.                                                                                                                  |
| **Community Platform**           | Create a platform for users to add notes or communicate with AI.                                                                                                                                                                       |

# 1. Code Structure

```bash
> .github - Github Actions CICD Pipeline
    | cd.yml - continuous deployment workflow
    | ci.yml - continuous integration workflow
> backend - Node & Express & MongoDB code
    | .env local node config/creds
    | package.json - backend dependencies
> diagrams - stores all diagram code(if any)
    | sequence-diagram.txt - sequence diagram code
> e2eTests - playwright e2e tests(chrome only)
    | .env - local playwright configs
> frontend - Vite React
    | .env local frontend config/creds
    | package.json - frontend dependencies
> infrastructure AWS CDK TypeScript
    | package.json - AWS CDK dependencies
> scripts - useful scripts for local dev, CI and CD
> wiremock - mock gemini ai response for local dev
.env - MONGODB local config/creds
docker-compose-ci.yml - docker-compose for CI environment
docker-compose-prod.yml - docker-compose for PROD environment
docker-compose.yml - docker-compose for LOCAL DEV environment
Dockerfile - Frontend & Backend App docker container
```

---

# 2. Useful development commands

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

---

# 3. Important: How to set up local development environment

## 1. Install nvm

### Windows

Download the Zip (nvm-noinstall.zip)
[HERE](https://github.com/coreybutler/nvm-windows/releases)

### Mac

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

## 2. Provision nodejs

```bash
nvm install 20.11.1
nvm use 20.11.1
```

## 3. Install nodemon globally

```bash
npm install -g nodemon
```

## 4. setup frontend react project

```bash
cd ./frontend
npm install
```

## 5. setup backend node project

```bash
cd ../backend
npm install
```

## 6. Install Docker Desktop

### Windows

Follow the instruction [HERE](https://docs.docker.com/desktop/install/windows-install/#:~:text=Download%20the%20installer%20using%20the,Program%20Files%5CDocker%5CDocker%20)

### Mac

```bash
brew install docker
```

---

# 4. How to run frontend react, backend node, mongodb in dev mode or as docker containers

## 1. Run mongodb & wiremock(docker-compose)

Run this from Git Bash if you use Windows

```bash
# In a new shell, and keep this shell opened
cd ./backend
npm run start:dep
```

#Verify the env,
Open http://localhost:8080/db/admin/ in your browser, and login with dev/dev

## 2. Run frontend react

```bash
cd ./frontend
npm run dev
```

## 3. Run backend node

```bash
cd ./backend
npm start
# (starts node server at `localhost:3000`)
```

## MongoDB

## Login to MongoDB

1. default username: devroot
1. default password: devroot
1. default database: cs732

## Login to MongoDB Admin Portal

http://localhost:8080/db/admin/

Username: `dev`, Password:`dev`

---

# 5.How to Build & Test Docker Image

Note that you do not need to use the docker image for local development.
The docker image is used for CI and PROD envs in docker-compose files.

See `./scripts/start-ci.sh` and `./scripts/start-prod.sh`

## Build the image

Run the following command under the root directory which builds a docker image `cs732-careless-crayfish` for react, node & mongodb

Run this from Git Bash if you use Windows

```bash
sh scripts/build.sh
```

## Run the image

```bash
docker run -p 8001:3000 -p 8000:5000 -d cs732-careless-crayfish
```

### Verify the instance of the image is up and running

1. Visit the backend: http://localhost:8001/api/users
2. Visit the frontend: http://localhost:8000/
3. Visit mongodb admin portal: http://localhost:8080 with username: dev, password: dev

---

# 6. How to test the code

## Frontend unit tests

1. `cd ./frontend`
2. `npm test`

## Backend unit tests

1. `cd ./backend`
2. `npm test`

## Backend api integration tests

1. spin up backend node.
2. spin up mongodb database through docker-compose

```
cd ./backend
npm run test:e2e
```

You can also manually test APIs with swagger UI

1. go to http://localhost:3000/api/api-docs
2. view and call apis for testing

## Testing AWS CDK infrastructure as code

We currently put dev and prod stacks all in one account but you can test deploying the stack with your own suffix.
You need to reachout to Mark(mzhu929) for giving you permission to access AWS console and deploying stacks as this is his personal AWS account.

```bash
cd ./infrastructure
npm run deploy-dev
```

Note that `npm run deploy-dev` and `npm run deploy-prod` are actually deploying the same stack at the moment as we could not afford to have multiple stacks.

### install dependency (Mac)

```bash
brew install arc
```

## Httpyac test example

Follow the instruction from https://httpyac.github.io/guide/examples.html

## Wiremock

Put your mock files under `deployment/wiremock/__files` and `deployment/wiremock/mappings`

Refere the `json` example here: https://wiremock.org/docs/stubbing/

## Browser end-to-end tests

### Note that we support only `Chrome` at this time

### Prerequisite

install playwright and chromium

```bash
npx playwright install --with-deps chromium
```

Ensure you have spinned up react, node servers & mongodb docker containers locally. If you have not, follow the `4. How to run frontend react, backend node, mongodb in dev mode or as docker containers` guide above.

under project root folder:

1. `cd e2eTests`
2. `npm run test:e2e`

If you raise a pr, Github Actions will trigger the `./github/workflow/ci.yml` workflow which runs all automated tests

---

# 7. Deployment

We deploy through Github Actions to an AWS EC2 instance. See `.github/workflows/cd.yml`

Currently if you raise a pr, Github Actions will trigger a deployment(to make testing easier). See `./.github/workflows/cd.yml`

---

# 8. Diagrams

See WIKI: `https://aucklanduni-team-cs732.atlassian.net/wiki/spaces/~7120204c38f940a5504122b1690ed6e3788862/pages/1114115/cs732-careless-crayfish+WIKI#Technical-Documentations`

For sequence diagraming, this file `./diagrams/sequence-diagram.txt` has code that can be run on `https://sequencediagram.org/` to generate our sequence diagram.

---

# 9. Q & A

### 1. sh command not found running npm commands

##### A: Please make sure you use Git Bash to run the command if you are on Windows

### 2. For AWS CDK code getting error when running `npm run deploy-dev`

##### A: See `testing AWS CDK infrastructure as code` section for details

### 3. How do I access latest deployed website

##### A: We provision new EC2 instances if we have infrastructure change. Need to go to github actions to grab the latest working public DNS. Get it from the latest successful `CD` build from Github Actions

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-careless-crayfish/assets/29388401/6aa34ed0-1479-48f9-89a5-ea07a2cd48cb)

latest frontend url(at the time of writing): http://ec2-54-252-174-153.ap-southeast-2.compute.amazonaws.com:5000

### 4. I see you have local config/creds stored in the .env files, do you use different configs/creds for CI and EC2?

##### A: See below screenshot where we store CI and EC2 configs/creds (you don't need to touch these unless you want to contribute):

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-careless-crayfish/assets/29388401/4c32332d-afc6-4c0b-84cb-fd554ec9b361)
