import express from 'express';

const usersRoute = express.Router();

// GET all users
usersRoute.get('/', async (req:express.Request, res:express.Response): Promise<void> => {
  try {
    res.status(200).send({ req });
  } catch (e) {
    res.status(400).send({ Error });
  }
});

// GET user by id
usersRoute.get('/:id', async (req:express.Request, res:express.Response): Promise<void> => {
  const { id } = req.params;
  try {
    res.status(200).send({ id });
  } catch (e) {
    res.status(400).send({ Error });
  }
});

// Post new user
usersRoute.post('/', async (req:express.Request, res:express.Response): Promise<void> => {
  try {
    res.status(201).send({ data: 'data' });
  } catch (e) {
    res.status(400).send({ Error });
  }
});

// PUT user by id
usersRoute.put('/:id', async (req:express.Request, res:express.Response): Promise<void> => {
  try {
    res.status(200).send({
      message: 'received query params',
      id: req.params.id,
      query: req.query,
    });
  } catch (e) {
    res.status(204).send({ Error });
  }
});

// DELETE user by id
usersRoute.delete('/:id', async (req:express.Request, res:express.Response): Promise<void> => {
  try {
    res.send(200).send({
      message: 'user deleted',
      id: req.params.id,
      query: req.query,
    });
  } catch (e) {
    res.status(400).send({ Error });
  }
});

export default usersRoute;
