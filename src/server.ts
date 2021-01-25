import App from './app'

import * as bodyParser from 'body-parser'

import UserController from './controllers/user.controller'

const app = new App({
    port: parseInt(process.env.PORT) || 5000,
    controllers: [
        new UserController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
})

app.listen()