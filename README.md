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
## setup frontend

1. cd ./frontend
2. npm install

## setup backend

1. cd ./backend
2. npm install

## Install docker
please google `Docker Desktop install`

## Privison database
You must install Docker Desktop before running the following command
```bash
docker-compose up -d
```


# Usage
## MongoDB
1. default username: devroot
1. default password: devroot
1. default database: cs732

## MongoDB Admin Portal
http://localhost:8080/ 

username: `dev`, password:`dev`

# How to run automated tests

## frontend

1. cd ./frontend
2. npm test

## backend

1. cd ./backend
2. npm test


