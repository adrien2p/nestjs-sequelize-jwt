![Nest](assets/logo.png)

# Nest-js-sequelize

## What about Nest 

https://github.com/kamilmysliwiec/nest/blob/master/Readme.md

## What about Sequelize 

https://github.com/sequelize/sequelize 

## And what about this repo ?

This project is a starter kit wich implement the following :

- Nest.js
- Sequelize (ORM)
- Umzug (Migration)
- Dotenv (Evironement variable) 

 ### How it works
- Start the server `npm start`
- To run the transpiler `npm run prestart:prod`
- To start the prod server `npm run start:prod`
- To run up/down migration `npm run migrate {up/down}`

### Configuration

To configure the project there is a folder `./src/config/*` which is the place to put the config you want.
To use the env variable, remove `.demo` from `.env.demo`