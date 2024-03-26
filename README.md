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


# Provision development environment (linux/Mac)
## Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

## Provision nodejs
```bash
nvm install 20.11.1
nvm use
```

## Install docker
please google `Docker Desktop install`

## Privison database
You must install Docker Desktop before running the following command
```bash
docker-compose up -d
```

# Locally Available Developer Tools
## MongoDB
1. default username: devroot
1. default password: devroot
1. default database: cs732

## MongoDB Admin Portal
http://localhost:8080/ 

username: `dev`, password:`dev`

# Docker image
## Build docker image locally
Run the following command under the root directory
```
sh scripts/build.sh
```
A docker image `cs732-careless-crayfish` will be created locally

## Run the image
### Provision the newly built docker image
```
docker run -p 8001:3000 -p 8000:5000 -d cs732-careless-crayfish
```
### Verify the instance of the image is up and running
1. Visit the backend: http://localhost:8001/api/users 
1. Visit the frontend: http://localhost:8000/ 