![Nest](assets/logo.png)

## What about Nest / Sequelize / JWT  

https://github.com/kamilmysliwiec/nest/blob/master/Readme.md

https://github.com/sequelize/sequelize 

https://jwt.io/

## And what about this repo ?

This project is a starter kit which implement the following :

- Nest.js
- Sequelize (ORM)
- Umzug (Migration)
- Dotenv (Evironement variable)
- JWT (For Json Web Token authentication) 

 ### How it works
 
- To run lint and fix `npm run lint`
- To run tests suite `npm run test`
- Start the server `npm start`
- To run up/down migration `npm run migrate {up/down}`

### Configuration

To configure put all config file in the `./src/config/*`.
To use the env variable, remove `.demo` from `.env.demo`.

### What is provided to start

- `User (Model)` Which provide you an example to use Sequelize definition 
- `UsersController` which provide you a full CRUD on the user instance model
- `AuthController` which provide a way to authenticate a user
- `AuthMiddleware` Which verify the token provided in the Authorization header of each request
- `AuthService` Which implement JWT sign method to be used easily for the login 
- `DispatchError` which provide a way to set the header before the response is send (`DispatchError filter`)
that catch MessageCodeError (which is a custom one, you can find it in `./lib/error`), ValidationError (Sequelize validation), HttpException, Error.

And of course the `migrations` folder with an example
