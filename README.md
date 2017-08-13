![Nest](assets/logo.png)

# Nest-js-sequelize

## What about Nest and Sequelize 

https://github.com/kamilmysliwiec/nest/blob/master/Readme.md
https://github.com/sequelize/sequelize 

## And what about this repo ?

This project is a starter kit wich implement the following :

- Nest.js
- Sequelize (ORM)
- Umzug (Migration)
- Dotenv (Evironement variable)
- JWT (For Json Web Token authentication) 

 ### How it works
 
- Start the server `npm start`
- To run the transpiler `npm run prestart:prod`
- To start the prod server `npm run start:prod`
- To run up/down migration `npm run migrate {up/down}`

### Configuration

To configure put all config file in the `./src/config/*`.
To use the env variable, remove `.demo` from `.env.demo`.

### What is provided to start

- `User (Model)` Wwich provide you an example to use Sequelize definition. 
- `UsersController` which provide you a full CRUD on the user instance model
- `AuthController` which provide a way to authenticate a user
- `AuthMiddleware` Which verify the token provided in the Authorization header of each request
- `AuthService` Which implement JWT sign method to be used easily for the login 
- `DispatchError` which provide a way to set the header before the response is send (DispatchError filter)
that catch MessageCodeError (which is a custom one, you can find it in ./lib/error), ValidationError (Sequelize validation), HttpException, Error.

And of course the `migrations` folder with an example
