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

# 1. Features Overview

Below is a detailed table categorizing the essential and additional features of our web application designed to streamline organizing social gatherings after work or school. Each feature is listed along with a detailed description.

## Feature Details

| Feature                          | Description                                                                                                                                                                                                                                             |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                                  |                                                                                                                                                                                                                                                         |
| **Recommendations**              | Utilize GPS to determine user location; allow users to select party type (e.g., food, shopping, natural scenery, exhibition) and input details like number of people, age range, and expected time; recommend appropriate venues based on these inputs. |
| **Votes**                        | Enable voting on recommended locations; set a deadline for votes; count votes to select the final gathering place; display voting results for clarity.                                                                                                  |
| **Support Sign-up & Login**      | Enable login via third-party accounts such as Google or Microsoft for ease.                                                                                                                                                                             |
| **Keep User Status**             | Allow users to resume previous activities upon re-login and retain state and activity history like voting records and preferences.                                                                                                                      |
| **Search Bar for History Votes** | Permit users to search and review past voting records and activity histories, refining searches by date and location.                                                                                                                                   |
| **Community Platform**           | Create a community platform for users to share experiences, discuss venues, and provide post-event feedback. Allow users to post voting links in the community.                                                                                         |

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
nvm use
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
cd ./backend
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
2. spin up mongodb database docker container

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

### Simulate github action locally

```
act # run all github actions
act -j build-test-backend # run a specific github action
```

## Browser end-to-end tests

### Note that we support only `Chrome` at this time

### Prerequisite

install playwright and chromium

```bash
npx playwright install --with-deps chromium
```

Ensure you have spinned up react, node servers & mongodb containers locally. If you have not, follow the `How to start local development` guide above.

under project root folder:

1. `cd e2eTests`
2. `npm run test:e2e`

If you raise a pr, Github Actions will trigger with the `./github/workflow/ci.yml` workflow which runs all automated tests

---

# 7. Deployment

We deploy by using Github Actions to archive source code and ssh into ec2. See `.github/workflows/cd.yml`

Q & A

### 1. sh command not found running npm commands

##### A: Please make sure you use Git Bash to run the command if you are on Windows

### 2. For AWS CDK code getting error when running `npm run deploy-dev`

##### A: See `testing AWS CDK infrastructure as code` section for details

### 3. How do I access latest deployed website

##### A: We provision new EC2 instances if we have infrastructure change. Need to go to github actions to grab the latest working public DNS
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-careless-crayfish/assets/29388401/6aa34ed0-1479-48f9-89a5-ea07a2cd48cb)

