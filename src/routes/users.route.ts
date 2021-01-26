import express from 'express';

const users = express.Router();

users.get('/', (req:express.Request, res:express.Response): void => {
  res.send('GET /users');
});

users.get('/:id', (req:express.Request, res:express.Response): void => {
  res.send(`GET /users${req.params.id}`);
});

users.put('/:id', (req:express.Request, res:express.Response): void => {
  res.send(`PUT /users${req.params.id}`);
});

users.delete('/:id', (req:express.Request, res:express.Response): void => {
  res.send(`DELETE /users${req.params.id}`);
});

export default users;
