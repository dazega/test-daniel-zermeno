# test-easylex
Thanks for be here, this app has been done with NodeJs with Express and the Database that you will need is Postgres
## Available commands
This application has available just one command to run the app and it will be as development
```bash
npm run dev
```
## Installation
Use the following command to install all the dependencies
```bash
npm install
```
You will need Sequelize-CLI to run some commands for the data base but first create the following database on Postgres
```bash
Create Database easylex-test
```
After you have created the database you need to run the following commands to create and initialize the database
```bash
sequelize db:migrate
sequelize db:seed:all
```
**Note**If you want to execute the commands above you need to install globaly sequelize to do that run the following
```bash
npm i -g sequelize-cli
```
## Configuration
You will need to configurate you enviroment variables to connect to your own database so open the file **config.json** and edit the variables username and password
## Before all
The Endpoints need a Authentication token if you need to use the app first you need to login and use the token that it returns and need to add it at the headers of your requests under the name Authentication
