import express from 'express';
import { UserRole, User } from '../interfaces/user-interface';

const usersRoute = express.Router();

// Mock data
const usersList: User[] = [
  {
    id: 1,
    userName: 'User1',
    telegramName: '@user1',
    telegramId: 11,
    phoneNumber: 555555,
    city: 'Kyiv',
    role: UserRole.admin,
    state: 'stringified json',
  },
  {
    id: 2,
    userName: 'User2',
    telegramName: '@user2',
    telegramId: 22,
    phoneNumber: 666666,
    city: 'Kharkiv',
    role: UserRole.regular,
    state: 'stringified json',
  },
  {
    id: 3,
    userName: 'User4',
    telegramName: '@user3',
    telegramId: 33,
    phoneNumber: 777777,
    city: 'Lviv',
    role: UserRole.superAdmin,
    state: 'stringified json',
  },
];

// GET all users
usersRoute.get('/', (req:express.Request, res:express.Response): void => {
  res.status(200).send(usersList);
});

// GET user by id
usersRoute.get('/:id', (req:express.Request, res:express.Response): void => {
  const { id } = req.params;
  const user: User = usersList.find((item) => item.id === parseInt(id, 10));
  res.status(200).send(user);
});

// PUT user by id
usersRoute.put('/:id', (req:express.Request, res:express.Response): void => {
  res.status(200).send({
    message: 'received query params',
    id: req.params.id,
    query: req.query,
  });
});

// DELETE user by id
usersRoute.delete('/:id', (req:express.Request, res:express.Response): void => {
  res.send(200).send({
    message: 'user deleted',
    id: req.params.id,
    query: req.query,
  });
});

export default usersRoute;
