import express from 'express';
import bodyparser from 'body-parser';
import users from './routes/users.route';

const app = express();

app.use(bodyparser.json());

app.use('/users', users);

export default app;
