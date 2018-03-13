# TODO MVC

Node.js task management app with CRUD functionalities, Express.js routing, input sanitization and authentication.

## Instructions

1. Set NODE_ENV to development.
2. Create config directory and config.json file in database directory.
3. Create a todo_mvc_dev or todo_mvc_prod database.
4. run `npm install`.
5. run `npm start`.

## Dependencies

* bcrypt
* body-parser
* dotenv
* ejs
* express
* express-session
* express-validator
* pg
* sequelize

## Testing

1. Set NODE_ENV to test.
2. Create a `todo_mvc_test` database.
3. Run npm test.


config.json example:

```
{
    "development": {
        "username": "postgres",
        "password": "",
        "database": "todo_mvc_dev",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "",
        "database": "todo_mvc_test",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "logging":false
    },
    "production": {
        "username": "postgres",
        "password": "",
        "database": "todo_mvc_prod",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "logging":false
    }
}
```